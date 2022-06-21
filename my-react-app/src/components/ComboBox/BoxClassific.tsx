import React, { useState, useEffect } from "react";
import { useForm, NestedValue } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

function refreshPage() {
  window.location.reload();
}

export const BoxClassific = () => {
  const [NameClassific, setNameClassific] = useState<any[]>([]);
  const { handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { autocomplete: [] },
  });

  useEffect(() => {
    axios.get("https://localhost:44328/api/classific").then((response) => {
      setNameClassific(response.data);
    });
  }, []);

//   const fetchClientes = () => {
//     axios.get("https://localhost:44328/api/maters").then((response) => {
//       setNameProduto(response.data);
//     });
//   };

  const addClassific = (data: any) => {
    // const cdOnly = data.autocomplete.map(({ CD_ITEM }) => ({
    //   ID_InvestCampanha: id.id[0].ID,
    //   ID_Produto: CD_ITEM,
    //   Fl_Ativo: true,
    //   DT_Criacao: "2022-06-06T00:00:00",
    //   DT_Alteracao: "2022-06-06T00:00:00",
    //   FL_Removido: false,
    // }));
    // console.log("data: ", data);
    // console.log("cdOnly: ", cdOnly);
    // cdOnly.map((dados: any) => {
    //   axios
    //     .post("https://localhost:44328/api/campanhaproduto", dados)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error, dados);
    //     });
    //   fetchClientes();
    // });
    console.log(data);
  };

  type Option = {
    DS_Classificacao: string;
    // CD_ITEM: string;
  };

  type FormValues = {
    autocomplete: NestedValue<Option[]>;
  };

  return (
    <>
      <form onSubmit={handleSubmit(addClassific)}>
        <section>
          <label>
            Adicionar produto a Campanha <b> </b>
          </label>
          <Autocomplete
            multiple
            options={NameClassific}
            getOptionLabel={(option: Option) => option.DS_Classificacao}
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
