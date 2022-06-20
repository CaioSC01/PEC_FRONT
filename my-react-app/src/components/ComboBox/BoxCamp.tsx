import React, { useState, useEffect } from "react";
import { useForm, NestedValue } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

function refreshPage() {
  window.location.reload();
}

export const BoxCamp = (id: any) => {
  const [NameCliente, setNameCliente] = useState<any[]>([]);
  const { handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { autocomplete: [] },
  });

  useEffect(() => {
    axios.get("https://localhost:44328/api/clientes").then((response) => {
      setNameCliente(response.data);
    });
  }, []);

  const fetchClientes = () => {
    axios.get("https://localhost:44328/api/clientes").then((response) => {
      setNameCliente(response.data);
    });
  };

  const addCliente = (data: any) => {
    const cdOnly = data.autocomplete.map(({ CD_PESSOA }) => ({
      ID_InvestCampanha: id.id[0].ID,
      ID_Cliente: CD_PESSOA,
      Fl_Ativo: true,
      DT_Criacao: "2022-06-06T00:00:00",
      DT_Alteracao: "2022-06-06T00:00:00",
      FL_Removido: false,
    }));
    cdOnly.map((dados: any) => {
      axios
        .post("https://localhost:44328/api/campanhacliente", dados)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error, data);
        });
      fetchClientes();
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
          <label>
            Adicionar clientes a Campanha <b> {id.id[0].Nome}</b>
          </label>
          <Autocomplete
            multiple
            options={NameCliente}
            getOptionLabel={(option: Option) => option.NM_GUERRA}
            onChange={(e, options) => setValue("autocomplete", options)}
            renderInput={(params) => <TextField {...params} />}
          />
        </section>
        <div className="py-2">
          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            GRAVAR
          </button>
        </div>
      </form>
    </>
  );
};
