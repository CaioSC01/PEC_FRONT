import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
// import './Style/modalGroup.css'
import { TableClient } from '../../Tables/TableCliente'
import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'

function refreshPage() {
  window.location.reload()
}
export const EditGroup = (id: any) => {
  const { control, register } = useForm()
  const [NameCliente, setNameCliente] = useState<any[]>([])
  const { handleSubmit } = useForm()
  const [selectedPerson, setSelectedPerson] = useState<any[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [dados, setDados] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('https://localhost:44328/api/grupo')
      .then(response => {
        setGroups(response.data)
        axios
          .get(`https://localhost:44328/api/GrupoCliente/${id.id.ID}`)
          .then(response => {
            setClientes(response.data)
          })
      })
      .catch(() => {
        console.log('DEU ERRADO')
      })
  }, [])

  const GetID = (
    id: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    axios
      .get(`https://localhost:44328/api/grupo/${id.id.ID}`)
      .then(response => {
        setDados(response.data)
        refreshPage()
      })
  }

  useEffect(() => {
    axios
      .get(`https://localhost:44328/api/grupocliente`)
      .then(response => {
        setSelectedPerson(response.data)
      })
      .catch(() => {
        console.log('DEU ERRADO')
      })
    axios.get('https://localhost:44328/api/clientes').then(response => {
      setNameCliente(response.data)
    })
  }, [])

  // const addCliente = (data: any) => {
  //   const cdOnly = data.autocomplete.map(({ CD_PESSOA }) => ({
  //     ID_Cliente: CD_PESSOA,
  //     ID_Grupo: id.id.ID,
  //     Status: true,
  //     DT_Criacao: '2022-06-06T00:00:00'
  //   }))
  //   cdOnly.map((dados: any) => {
  //     axios
  //       .post('https://localhost:44328/api/GrupoCliente', dados)
  //       .then(response => {
  //         console.log(response)
  //         refreshPage()
  //       })
  //       .catch(error => {
  //         console.log(error, data)
  //       })
  //   })
  // }

  const editForm = (info: any) => {
    axios
      .put(`https://localhost:44328/api/grupo/${id.id.ID}`, info)
      .then(() => {
        console.log('Deu tudo certo', info)
        refreshPage()
      })
      .catch(() => {
        console.log('DEU ERRADO', info)
      })
  }
  const deleteForm = (
    id: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!window.confirm('Deseja realmente excluir este post?')) return

    try {
      axios.delete(`https://localhost:44328/api/grupocliente/${id}`)
      alert('Cliente excluído com sucesso')
      refreshPage()
    } catch (error) {
      console.log(error)
      alert('Não foi excluir o cliente.')
    }
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-10">
          <tr>
            <th
              scope="col"
              className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Grupo
            </th>
            <th
              scope="col"
              className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>

            <th
              scope="col"
              className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ação
            </th>
          </tr>
        </thead>
        {clientes.map(clientes => {
          return (
            <React.Fragment key={clientes.ID}>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {clientes.ID_Grupo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        {NameCliente.map(name => {
                          return (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {clientes.ID_Cliente == name.CD_PESSOA ? (
                                  <div>{name.NM_GUERRA}</div>
                                ) : (
                                  ''
                                )}
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </td>

                  <td className="px-9 py-4 whitespace-nowrap">
                    <div
                      className={
                        clientes.Status === true
                          ? 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800'
                          : 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800'
                      }
                    >
                      {clientes.Status === true ? 'Ativo' : 'Inativo'}
                    </div>
                  </td>
                  <td className="px-9 py-4 whitespace-nowrap">
                    <button
                      className="text-gray-400 hover:text-gray-100  ml-2"
                      onClick={e => deleteForm(clientes.ID_Cliente, e)}
                    >
                      <span className="sr-only">Close panel</span>
                      <TrashIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        })}
      </table>
    </>
  )
}
