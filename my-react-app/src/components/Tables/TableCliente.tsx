import React, { useState, useEffect } from 'react'
import { useForm, NestedValue } from 'react-hook-form'
import { TextField, FormControl, Select, MenuItem } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
import { SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

export const TableClient = (id: any) => {
  const [NameCliente, setNameCliente] = useState<any[]>([])
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { autocomplete: [] }
  })
  const [selectedPerson, setSelectedPerson] = useState<any[]>([])
  // const [selectedId, setSelectedId] = useState<any[]>([])

  useEffect(() => {
    axios
      .get(`https://localhost:44328/api/grupocliente`)
      .then(response => {
        // setCliente(response.data)
      })
      .catch(() => {
        console.log('DEU ERRADO')
      })
    axios.get('https://localhost:44328/api/clientes').then(response => {
      setNameCliente(response.data)
    })
  }, [])

  const addCliente = (data: any) =>
    // axios
    //   .post(`http://localhost:3006/Client`, data.autocomplete)
    //   .then(response => {

    console.log(data.autocomplete)
  // })
  // .catch(error => {
  //   console.log(error, data)
  // })

  type Option = {
    NM_GUERRA: string
    CD_PESSOA: number
  }

  type FormValues = {
    autocomplete: NestedValue<Option[]>
  }

  const options = [
    { NM_GUERRA: 'Chocolate', CD_PESSOA: 1 },
    { NM_GUERRA: 'Strawberry', CD_PESSOA: 2 },
    { NM_GUERRA: 'Vanilla', CD_PESSOA: 3 }
  ]

  const cliente = ['JOSIANE TAVARES', 'PORTELA INDUSTR']

  return (
    <>
      <hr></hr>

      <form onSubmit={handleSubmit(addCliente)}>
        <section>
          <label>MUI Autocomplete</label>
          {/* {NameCliente.map(person => (
           */}
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-10">
          <tr>
            <th
              scope="col"
              className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              cliente
            </th>
            <th
              scope="col"
              className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider content_action"
            >
              Ações
            </th>
          </tr>
        </thead>

        {cliente.map(cliente => {
          return (
            <React.Fragment>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          1
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-sm text-gray-900">
                      {cliente}
                    </div>
                  </td>
                  <td className="px-9 py-4 whitespace-nowrap">
                    <div
                      className={
                        cliente.Status === true
                          ? 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800'
                          : 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800'
                      }
                    >
                      {cliente.Status === true ? 'Ativo' : 'Inativo'}
                    </div>
                  </td>

                  <td className="content_td">
                    <button className="text-gray-400 hover:text-gray-100  mx-2">
                      <span className="sr-only">Close panel</span>
                      <PencilIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <button className="text-gray-400 hover:text-gray-100  ml-2">
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
      {/* <form onSubmit={handleSubmit(addForm)}>
        <ComboBox options={data} />

        <button type="submit"> Gravar </button>
      </form> */}
    </>
  )
}
