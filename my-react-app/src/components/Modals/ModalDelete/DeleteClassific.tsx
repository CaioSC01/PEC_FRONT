import axios from 'axios'
import { useForm } from 'react-hook-form'

function refreshPage() {
  window.location.reload()
}

export const ModalDelete = (id: any) => {
  const { handleSubmit } = useForm()

  console.log('olhaqui:', id.id)
  const deleteForm = (data: any) => {
    axios
      .delete(`https://localhost:44328/api/classific/${id.id.ID}`, data)
      .then(() => {
        console.log('Deu tudo certo', data)
        refreshPage()
      })
      .catch(() => {
        console.log('DEU ERRADO', data, id)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(deleteForm)}>
        Tem certeza que deseja deletar
        <b> {id.id.DS_Classificacao} </b>?<p>Essa ação é irreversivel.</p>
        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#9a8e74] hover:bg-[#b5aa92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Deletar
        </button>
      </form>
    </>
  )
}
