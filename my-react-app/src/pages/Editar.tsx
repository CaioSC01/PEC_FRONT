import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'

import { Navigate, useNavigate, useParams } from 'react-router-dom'

function Edit() {
  const { id } = useParams()

  let history = useNavigate()

  const addPost = (data: any) =>
    axios
      .put(`https://localhost:44328/api/classific/${id}`, data)
      .then(() => {
        console.log('Deu tudo certo')
        // Navigate.push('/')
      })
      .catch(() => {
        console.log('DEU ERRADO')
      })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  useEffect(() => {
    axios.get(`https://localhost:44328/api/classific/${id}`).then(response => {
      reset(response.data)
    })
  }, [])

  return (
    <form onSubmit={handleSubmit(editForm)}>
      <Controller
        render={({ field }) => (
          <select {...field} className="active_content">
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
          Classificação
        </label>
        <input
          type="text"
          id="classificacao"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          {...register('DS_Classificacao')}
          placeholder=""
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Salvar
      </button>
    </form>
  )
}

export default Edit
