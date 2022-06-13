import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
import { Modal } from 'react-bootstrap'
import { EditGroup } from '../Modals/ModalEdit/EditGroup'
import { ModalDeleteGroup } from '../Modals/ModalDelete/DeleteGroup'

// import { ModalEditGroup } from './modals/ModalEdit/EditGroup'

function refreshPage() {
  window.location.reload()
}

export const TableGroups = () => {
  const [showE, setShowE] = useState(false)
  const handleShowE = () => setShowE(true)
  const handleCloseE = () => setShowE(false)
  const [showD, setShowD] = useState(false)
  const handleShowD = () => setShowD(true)
  const handleCloseD = () => setShowD(false)
  const [groups, setGroups] = useState<any[]>([])
  const [dados, setDados] = useState<any[]>([])
  const [id, setId] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('https://localhost:44328/api/grupo')
      .then(response => {
        setGroups(response.data)
      })
      .catch(() => {
        console.log('DEU ERRADO')
      })
  }, [])

  // const deleteForm = (
  //   id: any,
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault()
  //   console.log(id)

  //   if (!window.confirm('Deseja realmente excluir este post?')) return

  //   try {
  //     axios.delete(`https://localhost:44328/api/grupo/${id}`)
  //     alert('Post excluído com sucesso')
  //     refreshPage()
  //   } catch (error) {
  //     console.log(error)
  //     alert('Não foi excluir o post.')
  //   }
  // }
  const EditForm = (
    id: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    axios.get(`https://localhost:44328/api/grupo/${id}`).then(response => {
      setDados(response.data)
    })
  }
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-10">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                        Grupo
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
                  {groups.map(groups => {
                    return (
                      <React.Fragment key={groups.ID}>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {groups.ID}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-bold text-sm text-gray-900">
                                {groups.DS_Grupo}
                              </div>
                            </td>
                            <td className="px-9 py-4 whitespace-nowrap">
                              <div
                                className={
                                  groups.Status === true
                                    ? 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800'
                                    : 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800'
                                }
                              >
                                {groups.Status === true ? 'Ativo' : 'Inativo'}
                              </div>
                            </td>

                            <td className="content_td">
                              <button
                                onClick={e => EditForm(groups.ID, e)}
                                className="text-gray-400 hover:text-gray-100  mx-2"
                              >
                                <span className="sr-only">Close panel</span>
                                <PencilIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                  onClick={handleShowE}
                                />
                              </button>

                              <button
                                className="text-gray-400 hover:text-gray-100  ml-2"
                                onClick={e => EditForm(groups.ID, e)}
                              >
                                <span className="sr-only">Close panel</span>
                                <TrashIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                  onClick={handleShowD}
                                />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </React.Fragment>
                    )
                  })}
                </table>
                {dados.map(dados => {
                  return (
                    <>
                      <Modal
                        show={showE}
                        onHide={handleCloseE}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header>
                          <Modal.Title>Editar Grupo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <EditGroup id={dados} />
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleCloseE}
                          >
                            Cancelar
                          </button>
                        </Modal.Footer>
                      </Modal>

                      <Modal
                        show={showD}
                        onHide={handleCloseD}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header>
                          <Modal.Title>
                            Deletar Classificação <b></b>
                          </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <ModalDeleteGroup id={dados} />
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleCloseD}
                          >
                            Cancelar
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
