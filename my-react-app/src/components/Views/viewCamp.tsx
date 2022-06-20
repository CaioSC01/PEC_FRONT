import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { PlusSmIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { NestedValue, useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import React from "react";
import { TableClient } from "../Tables/TableCliente";

function refreshPage() {
	window.location.reload();
  }

const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewCamp(id: any) {
	const [Clientes, setClientes] = useState<any[]>([])
	const [NameCliente, setNameCliente] = useState<any[]>([])
  
	useEffect(() => {
	  axios
		.get(`https://localhost:44328/api/GrupoCliente/${id.id.ID}`)
		.then(response => {
		  setClientes(response.data)
		  axios.get('https://localhost:44328/api/clientes').then(response => {
			setNameCliente(response.data)
		  })
		})
		.catch(() => {
		  console.log('DEU ERRADO')
		})
	}, [])
  
	const fetchClientes = () => {
	  axios
		.get(`https://localhost:44328/api/GrupoCliente/${id.id.ID}`)
		.then(response => {
		  setClientes(response.data)
		  axios.get('https://localhost:44328/api/clientes').then(response => {
			setNameCliente(response.data)
		  })
		})
		.catch(() => {
		  console.log('DEU ERRADO')
		})
	}
  
	const deleteForm = (
	  id_grupo: any,
	  id: any,
	  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
	  e.preventDefault()
	  console.log(id)
	  if (!window.confirm('Deseja realmente excluir este post?')) return
  
	  try {
		axios.delete(`https://localhost:44328/api/grupocliente/${id_grupo}/${id}`)
		alert('Post excluído com sucesso')
		fetchClientes()
	  } catch (error) {
		console.log(error)
		alert('Não foi excluir o post.')
	  }
	}
  
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
  //   const [id.id, setid.id] = useState<any[]>([]);

  //   useEffect(() => {
  //     axios
  //       .get("https://localhost:44328/api/id.idanha")
  //       .then((response) => {
  //         setid.id(response.data);
  //       })
  //       .catch(() => {
  //         console.log("DEU ERRADO");
  //       });
  //   }, []);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h1
                        id="slide-over-heading"
                        className="text-lg font-medium text-gray-900"
                      >
                        Campanha
                      </h1>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover"
                            src="https://picsum.photos/500/300?random=1"
                            alt=""
                          />
                        </div>
                        <div
                          className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6"
                          key={id.id[0].ID}
                        >
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                  {id.id[0].Nome}
                                </h3>
                                <span
                                  className={
                                    id.id[0].Fl_Ativo === true
                                      ? "inline-flex items-center px-22.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mx-3"
                                      : "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800 mx-3"
                                  }
                                >
                                  {id.id[0].Fl_Ativo === true
                                    ? "Ativo"
                                    : "Inativo"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {id.id[0].DT_Criacao}
                              </p>
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              {/* <button
                                type="button"
                                className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                              >
                                Message
                              </button>
                              <button
                                type="button"
                                className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Call
                              </button> */}
                              {/* <div className="ml-3 inline-flex sm:ml-0">
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left"
                                > */}
                                  {/* <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">
                                      Open options menu
                                    </span>
                                    <DotsVerticalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button> */}
                                  {/* <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  > */}
                                    {/* <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                              )}
                                            >
                                              View profile
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                              )}
                                            >
                                              Copy profile link
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items> */}
                                 
                                {/* </Menu>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 pb-2 sm:px-0 sm:pt-0">
                      <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                          <p className="p-1 text-2xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">
                            Clientes
                          </p>

                        </div>
						<TableClient id={id.id} />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-10">
          <tr>
            <th
              scope="col"
              className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Clientes
            </th>
            <th
              scope="col"
              className="px-13 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ação
            </th>
          </tr>
        </thead>
        {people
		.map(clientes => {
          return (
            <React.Fragment key={clientes.name}>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        {people.map(name => {
                          return (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {clientes.name == name.name ? (
                                  <div>{name.name}</div>
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

                  
                  <td className="px-2 py-4 whitespace-nowrap">
                    <button
                      className="text-gray-400 hover:text-gray-100  ml-2"
                      onClick={e =>
                        deleteForm(clientes.name, clientes.name, e)
                      }
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
                       <hr /> 
					   <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                          <p className="p-1 text-2xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">
                            Produtos
                          </p>

                        </div>
					   <TableClient id={id.id} />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-10">
          <tr>
            <th
              scope="col"
              className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Clientes
            </th>
            <th
              scope="col"
              className="px-13 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ação
            </th>
          </tr>
        </thead>
        {people
		.map(clientes => {
          return (
            <React.Fragment key={clientes.name}>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        {people.map(name => {
                          return (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {clientes.name == name.name ? (
                                  <div>{name.name}</div>
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

                  
                  <td className="px-2 py-4 whitespace-nowrap">
                    <button
                      className="text-gray-400 hover:text-gray-100  ml-2"
                      onClick={e =>
                        deleteForm(clientes.name, clientes.name, e)
                      }
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
                      </dl>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </>
  );
}
