import { SideBar } from './Components/SideBar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Deals } from './Pages/Deals'
import { Game } from './Pages/Game'
import { Games } from './Pages/Games'

export function App () {
  return (
    <main className='w-full h-full flex flex-row bg-[#0F172A]  text-[#E2E8F0]'>
      <SideBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/game/:id' element={<Game />} />
        <Route path='/games/:title' element={<Games />} />
      </Routes>
    </main>
  )
}
