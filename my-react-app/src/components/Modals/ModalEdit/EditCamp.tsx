import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
// import './Style/modalClient.css'

function refreshPage() {
  window.location.reload();
}

export const EditCamp = (id: any) => {
  const { control, register, handleSubmit } = useForm();

  console.log("olhaqui:", id.id);
  const editForm = (data: any) => {
    axios
      .put(`https://localhost:44328/api/campanha/${id.id.ID}`, data)
      .then(() => {
        console.log("Deu tudo certo", data);
        refreshPage();
      })
      .catch(() => {
        console.log("DEU ERRADO", data, id);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(editForm)}>
        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 modal_content">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            Nome da Campanha
          </label>
          <input
            type="text"
            id="name_cp"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("Nome")}
            placeholder={id.id.Nome}
          />
        </div>

        <Controller
          render={({ field }) => (
            <select {...field} className="active_content ">
              <option>Status</option>
              <option value={"true"}>Ativo</option>
              <option value={"false"}>Inativo</option>
            </select>
          )}
          control={control}
          name="Fl_Ativo"
        />
        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 modal_content">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            Data de Criação
          </label>
          <input
            type={"datetime-local"}
            id="date"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("DT_Criacao")}
          />
        </div>

        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 modal_content">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            Data de alteração
          </label>
          <input
            type={"datetime-local"}
            id="date"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            {...register("DT_Alteracao")}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar
        </button>
      </form>
    </>
  );
};
