import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
// import './Style/modalGroup.css'
import { TableClient } from '../../Tables/TableCliente'

function refreshPage() {
  window.location.reload()
}
export const EditGroup = (id: any) => {
  const { control, register, handleSubmit } = useForm()

  console.log('olhaqui:', id.id)
  const editForm = (data: any) => {
    axios
      .put(`https://localhost:44328/api/grupo/${id.id.ID}`, data)
      .then(() => {
        console.log('Deu tudo certo', data)
        refreshPage()
      })
      .catch(() => {
        console.log('DEU ERRADO', data, id)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(editForm)}>
        <Controller
          render={({ field }) => (
            <select {...field} className="active_content">
              {id.id.Status}
              <option>Status</option>
              <option value={'true'}>Ativo</option>
              <option value={'false'}>Inativo</option>
            </select>
          )}
          control={control}
          name="Status"
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
            {...register('DS_Grupo')}
            placeholder={id.id.DS_Grupo}
          />
        </div>

        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 modal_content">
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
            {...register('Data')}
            placeholder={id.id.Data}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar
        </button>
      </form>

      <TableClient></TableClient>
    </>
  )
}
