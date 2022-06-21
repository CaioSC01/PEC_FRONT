import { useState } from 'react'
import { PlusSmIcon } from '@heroicons/react/outline'
import { Modal } from 'react-bootstrap'
import './page.style/campanha.css'
import { CardsCampanha } from '../components/Tables/CardsCampanha'
import { ModalCampanha } from '../components/Modals/ModalAdd/ModalCampanha'

export const Campanha = () => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  return (
    <>
      <div className=" content_group">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <section
                  aria-labelledby="primary-heading"
                  className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last p-4"
                >
                  <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                    <h2 className="p-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                      Campanha Promocional
                    </h2>
                    <button
                      type="button"
                      className="flex bg-[#9a8e74] p-1 rounded-full items-center justify-center text-white hover:bg-[#b5aa92] focus:outline-none  "
                      onClick={handleShow}
                    >
                      <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">Add Campanha</span>
                    </button>
                  </div>
                  {/* Começando Modal */}

                  <CardsCampanha />
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header>
                      <Modal.Title>Adicionar Campanha</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ModalCampanha />
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleClose}
                      >
                        Cancelar
                      </button>
                    </Modal.Footer>
                  </Modal>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
