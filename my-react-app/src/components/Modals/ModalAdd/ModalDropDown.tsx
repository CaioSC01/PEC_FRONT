import axios from 'axios'
import React, { useEffect, useState } from 'react'




export const ModalDropDown = () => {
  const [clientes, setClientes] = useState<any[]>([])
  const [groups, setGroups] = useState<any[]>([])
  useEffect(() => {
    axios
      .get('https://localhost:44328/api/grupo')
      .then(response => {
        setGroups(response.data)
        axios.get(`https://localhost:44328/api/GrupoCliente`).then(response => {
          setClientes(response.data) 
        })
      })
      .catch(() => {
        console.log('DEU ERRADO')
      })
  }, [])
  return (
    <>
    <div className="dropdown_buton">
    <UnopDropdown
      trigger={<button>click</button>}
    >
      <ul
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow:
            '10px 5px 20px #f1efef, -10px -5px 20px #f1efef',
          boxSizing: 'border-box',
          padding: '30px',
          width: '300px'
        }}
        // {...register('CD_Pessoa')}
      >
        <li></li>
      </ul>
    </UnopDropdown>
  </div>
    </>
  )
}
