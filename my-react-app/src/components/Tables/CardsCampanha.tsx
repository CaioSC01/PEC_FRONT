import React, { Fragment, useEffect, useRef, useState } from "react";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { EditCamp } from "../Modals/ModalEdit/EditCamp";
import { ModalDeleteCamp } from "../Modals/ModalDelete/DeleteCamp";

import { Dialog, Menu, Transition } from "@headlessui/react";
import ViewCamp from "../Views/viewCamp";
import { XIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { darken } from "@material-ui/core";

// import { ModalEditCamp } from './modals/ModalEdit/EditCamp'

function refreshPage() {
  window.location.reload();
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const CardsCampanha = () => {
  const [showE, setShowE] = useState(false);
  const handleShowE = () => setShowE(true);
  const handleCloseE = () => setShowE(false);
  const [showD, setShowD] = useState(false);
  const handleShowD = () => setShowD(true);
  const handleCloseD = () => setShowD(false);
  const [camp, setCamp] = useState<any[]>([]);
  const [dados, setDados] = useState<any[]>([]);
  const [view, setView] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  let completeButtonRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://localhost:44328/api/campanha")
      .then((response) => {
        setCamp(response.data);
      })
      .catch(() => {
        console.log("DEU ERRADO");
      });
  }, []);

  const SetCamp = (
    id: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios.get(`https://localhost:44328/api/campanha/${id}`).then((response) => {
      setView(response.data);
      setOpen(true);
    });
  };

  const EditForm = (
    id: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    axios.get(`https://localhost:44328/api/campanha/${id}`).then((response) => {
      setDados(response.data);
    });
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setOpen}
          initialFocus={completeButtonRef}
        >
          <div className="fixed inset-0" />

          <ViewCamp id={view} />
        </Dialog>
      </Transition.Root>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {camp.map((camp) => (
          <li
            key={camp.ID}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-sm font-medium text-gray-500 truncate">
                    {camp.Nome}
                  </h3>
                  <span
                    className={
                      camp.Fl_Ativo === true
                        ? "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
                        : "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                    }
                  >
                    {camp.Fl_Ativo === true ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <button
                    onClick={(e) => EditForm(camp.ID, e)}
                    className="text-gray-400 hover:text-gray-100 px-10 mx-2"
                  >
                    <span className="sr-only">Close panel</span>
                    <PencilIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={handleShowE}
                    />
                  </button>
                </div>
                <div className="w-0 flex-1 flex">
                  <button
                    className="text-gray-400 hover:text-gray-100 px-10 py-2 mx-2"
                    onClick={(e) => SetCamp(camp.ID, e)}
                  >
                    <span className="sr-only">Close panel</span>
                    <EyeIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <button
                    className="text-gray-400 hover:text-gray-100 px-10 ml-2"
                    onClick={(e) => EditForm(camp.ID, e)}
                  >
                    <span className="sr-only">Close panel</span>
                    <TrashIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={handleShowD}
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

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
                <Modal.Title>Editar Campanha</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditCamp id={dados} />
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                <ModalDeleteCamp id={dados} />
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
            <Modal>
              <Modal.Title>Vizualisar</Modal.Title>
            </Modal>
          </>
        );
      })}
    </>
  );
};
