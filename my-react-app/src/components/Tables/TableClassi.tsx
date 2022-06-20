import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { ModalEdit } from "../Modals/ModalEdit/EditClassific";
import { Modal } from "react-bootstrap";
import { ModalDelete } from "../Modals/ModalDelete/DeleteClassific";

function refreshPage() {
  window.location.reload();
}

export const TableClassi = () => {
  const [showE, setShowE] = useState(false);
  const handleShowE = () => setShowE(true);
  const handleCloseE = () => setShowE(false);
  const [showD, setShowD] = useState(false);
  const handleShowD = () => setShowD(true);
  const handleCloseD = () => setShowD(false);
  const [classific, setClassific] = useState<any[]>([]);
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:44328/api/classific")
      .then((response) => {
        setClassific(response.data);
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
  }, []);

  const EditForm = (
    id: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios
      .get(`https://localhost:44328/api/classific/${id}`)
      .then((response) => {
        setDados(response.data);
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-10">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-1 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Classificação
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      Ações
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                {classific.map((classific) => {
                  return (
                    <React.Fragment key={classific.ID}>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900">
                                {classific.ID}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {classific.DS_Classificacao}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                            <div
                              className={
                                classific.Status === true
                                  ? "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                                  : "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                              }
                            >
                              {classific.Status === true ? "Ativo" : "Inativo"}
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={(e) => EditForm(classific.ID, e)}
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
                              onClick={(e) => EditForm(classific.ID, e)}
                              className="text-gray-400 hover:text-gray-100  mx-2"
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
                  );
                })}
              </table>
              {dados.map((dados) => {
                return (
                  <>
                    <Modal
                      show={showE}
                      onHide={handleCloseE}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header>
                        <Modal.Title>Editar Classificação</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ModalEdit id={dados} />
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
                        <ModalDelete id={dados} />
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
