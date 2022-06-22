import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Controller, NestedValue, useForm } from "react-hook-form";
import "./Style/modalGroup.css";
import ReactSelect from "react-select";
// import { TableClient } from "../../ComboBox/BoxGrupo";
// import { BoxClassific } from "../../ComboBox/BoxClassific";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

function refreshPage() {
  window.location.reload();
}
// onChange={handleStatusChange}
export const ModalGroup = () => {
  const { control, register, handleSubmit } = useForm();
  const [NameClassific, setNameClassific] = useState<any[]>([]);
  

  useEffect(() => {
    axios.get("https://localhost:44328/api/classific").then((response) => {
      setNameClassific(response.data);
    });
  }, []);
  console.log("alo: ", NameClassific);

  const addForm = (data: any) => {
    console.log(data);
    axios
      .post("https://localhost:44328/api/grupo", data)
      .then((response) => {
        console.log(response.data);
        refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };
//   type Option = {
//     DS_Classificacao: string;
    // CD_ITEM: string;
//   };

//   type FormValues = {
//     autocomplete: NestedValue<Option[]>;
//   };

return (
    <>
      <form onSubmit={handleSubmit(addForm)}>
        <Controller
          render={({ field }) => (
            <select {...field} className="active_content2">
              <option>Status</option>
              <option value={"true"}>Ativo</option>
              <option value={"false"}>Inativo</option>
            </select>
          )}
          control={control}
          name="Status"
		  
        />
        <Controller
          render={({ field }) => (
            <select {...field} className="active_content">
              <option>Classificacao</option>
              {NameClassific.map((name) => (
                <option value={name.ID}>{name.DS_Classificacao}</option>
              ))}
            </select>
          )}
          control={control}
          name="ID_Class_Pec"
        />
        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 modal_content">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            Nome do Grupo
          </label>
          <input
            type="text"
            id="grupo"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("DS_Grupo")}
            placeholder=""
          />
        </div>

        {/* <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 modal_content">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            Data
          </label>
          <input
            type="date"
            id="date"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("Data")}
            placeholder=""
          />
        </div> */}

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar
        </button>
      </form>
      {/* <BoxClassific/> */}
    </>
  );
};
