import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { PlusSmIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import React from "react";
import { BoxCamp } from "../ComboBox/BoxCamp";
import { BoxCampProdut } from "../ComboBox/BoxCampProdut";
import './view.css'

export default function ViewCamp(id: any) {
  const [Clientes, setClientes] = useState<any[]>([]);
  const [NameCliente, setNameCliente] = useState<any[]>([]);
  const [NameProdutos, setNameProdutos] = useState<any[]>([]);
  const [Produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`https://localhost:44328/api/Campanhacliente/${id.id[0].ID}`)
      .then((response) => {
        setClientes(response.data);
        axios.get("https://localhost:44328/api/clientes").then((response) => {
          setNameCliente(response.data);
        });
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
    axios
      .get(`https://localhost:44328/api/Campanhaproduto/${id.id[0].ID}`)
      .then((response) => {
        setProdutos(response.data);
        axios.get("https://localhost:44328/api/maters").then((response) => {
          setNameProdutos(response.data);
        });
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
  }, []);

  const fetchClientes = () => {
    axios
      .get(`https://localhost:44328/api/Campanhacliente/${id.id[0].ID}`)
      .then((response) => {
        setClientes(response.data);
        axios.get("https://localhost:44328/api/clientes").then((response) => {
          setNameCliente(response.data);
        });
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
    axios
      .get(`https://localhost:44328/api/Campanhaproduto/${id.id[0].ID}`)
      .then((response) => {
        setProdutos(response.data);
        axios.get("https://localhost:44328/api/maters").then((response) => {
          setNameProdutos(response.data);
        });
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
  };

  const deleteForm = (
    ID_investCampanha: any,
    ID_Cliente: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    axios.delete(
      `https://localhost:44328/api/campanhacliente/${ID_investCampanha}/${ID_Cliente}`
    );
    alert("Post excluído com sucesso");
    fetchClientes();
  };

  const deleteProduto = (
    ID_investCampanha: any,
    ID_Produto: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    axios.delete(
      `https://localhost:44328/api/campanhaproduto/${ID_investCampanha}/${ID_Produto}`
    );
    alert("Post excluído com sucesso");
    fetchClientes();
  };

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
                        className="text-lg font-medium text-black"
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
                        {/* <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover "
                            src="https://www.vaxxinova.com.br/wp-content/themes/vaxxinova/images/logo-vaxxinova.svg"
                            alt=""
                          />
                        </div> */}
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
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3"></div>
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
                        <BoxCamp id={id.id} />
                        <table className="min-w-full divide-y divide-gray-300 content">
                          <thead className="bg-gray-10 ">
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
                          {Clientes.map((clientes) => {
                            return (
                              <React.Fragment key={clientes.ID}>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="ml-4">
                                          {NameCliente.map((name) => {
                                            return (
                                              <>
                                                <div className="text-sm font-medium text-gray-900">
                                                  {clientes.ID_Cliente ==
                                                  name.CD_PESSOA ? (
                                                    <div>{name.NM_GUERRA}</div>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                              </>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-2 py-4 whitespace-nowrap">
                                      <button
                                        className="text-gray-400 hover:text-gray-100  ml-2"
                                        onClick={(e) =>
                                          deleteForm(
                                            id.id[0].ID,
                                            clientes.ID_Cliente,
                                            e
                                          )
                                        }
                                      >
                                        <span className="sr-only">
                                          Close panel
                                        </span>
                                        <TrashIcon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </React.Fragment>
                            );
                          })}
                        </table>
                        <hr />
                        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                          <p className="p-1 text-2xl font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">
                            Produtos
                          </p>
                        </div>
                        <BoxCampProdut id={id.id} />
                        <table className="min-w-full divide-y divide-gray-200 content">
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
                          {Produtos.map((produto) => {
                            return (
                              <React.Fragment key={produto.ID}>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="ml-4">
                                          {NameProdutos.map((name) => {
                                            return (
                                              <>
                                                <div className="text-sm font-medium text-gray-900">
                                                  {produto.ID_Produto ==
                                                  name.CD_ITEM ? (
                                                    <>
                                                      <div>{name.DS_ITEM}</div>
                                                      <div>{name.UN}</div>
                                                    </>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                              </>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-2 py-4 whitespace-nowrap">
                                      <button
                                        className="text-gray-400 hover:text-gray-100  ml-2"
                                        onClick={(e) =>
                                          deleteProduto(
                                            id.id[0].ID,
                                            produto.ID_Produto,
                                            e
                                          )
                                        }
                                      >
                                        <span className="sr-only">
                                          Close panel
                                        </span>
                                        <TrashIcon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </React.Fragment>
                            );
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
