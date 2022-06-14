import React, { useState, useEffect } from "react";
import { useForm, NestedValue } from "react-hook-form";
import { TextField, FormControl, Select, MenuItem } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";


function refreshPage() {
	window.location.reload()
  }

export const TableClient = (id: any) => {
  const [NameCliente, setNameCliente] = useState<any[]>([]);
  const { handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { autocomplete: [] },
  });
  const [selectedPerson, setSelectedPerson] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`https://localhost:44328/api/grupocliente`)
      .then((response) => {
        setSelectedPerson(response.data);
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
    axios.get("https://localhost:44328/api/clientes").then((response) => {
      setNameCliente(response.data);
    });
  }, []);

  const addCliente = (data: any) => {
    const cdOnly = data.autocomplete.map(({ CD_PESSOA }) => ({
      ID_Cliente: CD_PESSOA,
      ID_Grupo: id.id.ID,
      Status: true,
      DT_Criacao: "2022-06-06T00:00:00",
    }));
    cdOnly.map((dados: any) => {
      axios
        .post("https://localhost:44328/api/GrupoCliente", dados)
        .then((response) => {
          console.log(response);
		  refreshPage()
        })
        .catch((error) => {
          console.log(error, data);
        });
    });
  };

  type Option = {
    NM_GUERRA: string;
    CD_PESSOA: number;
  };

  type FormValues = {
    autocomplete: NestedValue<Option[]>;
  };

  return (
    <>
      <form onSubmit={handleSubmit(addCliente)}>
        <section>
          <label>Adicionar clientes ao grupo {id.id.DS_Grupo}</label>
          <Autocomplete
            multiple
            options={NameCliente}
            getOptionLabel={(option: Option) => option.NM_GUERRA}
            onChange={(e, options) => setValue("autocomplete", options)}
            renderInput={(params) => <TextField {...params} />}
          />
        </section>

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          GRAVAR
        </button>
      </form>
    </>
  );
};