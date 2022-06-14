import React, { useState, useEffect } from 'react'
import { useForm, NestedValue } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import UnopDropdown from 'unop-react-dropdown'
import { GroupCli } from '../../pages/GroupCli'

function refreshPage() {
  window.location.reload()
}

export const TableClient = (id: any) => {
  const [NameCliente, setNameCliente] = useState<any[]>([])
  const { handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { autocomplete: [] }
  })
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

  const addCliente = (data: any) => {
    const cdOnly = data.autocomplete.map(({ CD_PESSOA }) => ({
      ID_Cliente: CD_PESSOA,
      ID_Grupo: id.id.ID,
      Status: true,
      DT_Criacao: '2022-06-06T00:00:00'
    }))
    cdOnly.map((dados: any) => {
      axios
        .post('https://localhost:44328/api/GrupoCliente', dados)
        .then(response => {
          console.log(response)
          refreshPage()
        })
        .catch(error => {
          console.log(error, data)
        })
    })
  }

  type Option = {
    NM_GUERRA: string
    CD_PESSOA: number
  }

  type FormValues = {
    autocomplete: NestedValue<Option[]>
  }

  return (
    <>
      <form onSubmit={handleSubmit(addCliente)}>
        <section>
          <label>Adicionar clientes ao grupo <b>{id.id.DS_Grupo}</b></label>
          <Autocomplete
            multiple
            options={NameCliente}
            getOptionLabel={(option: Option) => option.NM_GUERRA}
            onChange={(e, options) => setValue('autocomplete', options)}
            renderInput={params => <TextField {...params} />}
          />
        </section>

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          GRAVAR
        </button>
      </form>
      {/* <table className="min-w-full divide-y divide-gray-200">
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
                        <div className="text-sm font-medium text-gray-900">
                          {clientes.ID_Cliente}
                        </div>
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
                </tr>
              </tbody>
            </React.Fragment>
          )
        })}
      </table> */}
    </>
  )
}
