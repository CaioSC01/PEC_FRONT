import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Topnav } from './components/Topnav'
import { ClassificCli } from './pages/ClassificCli'
import { Campanha } from './pages/Campanha'
import { GroupCli } from './pages/GroupCli'
import Edit from './pages/Editar'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Topnav />
      <Routes>
        <Route path="/" element={<div>oi</div>} />
        <Route path="/classific" element={<ClassificCli />} />
        <Route path="/group" element={<GroupCli />} />
        <Route path="/campanha" element={<Campanha />} />
        <Route path="/editar" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
