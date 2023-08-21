import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Home () {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSetSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    console.log(search)
  }

  const go = () => {
    navigate(`/games/${search}`)
  }

  useEffect(() => {
    const handleKeyPressed = (e) => {
      if (e.key === 'Enter' || e.keyCode === 13 & search !== '') {
        console.log(search)
        navigate(`/games/${search}`)
      }
    }
    document.addEventListener('keydown', handleKeyPressed)

    return () => {
      document.removeEventListener('keydown', handleKeyPressed)
    }
  }, [])

  return (
    <div className='ml-48 h-screen flex flex-col w-full items-center mt-8'>
      <h1>En GameMrkt busca tus juegos favoritos y encuentra ofertas de los mismos!</h1>
      <p>¿A qué esperas? Busca ya tu juego favorito</p>
      <div className='w-full flex justify-center items-center mt-8'>
        <input
          onChange={(e) => handleSetSearch(e)} className='w-3/4 text-black rounded-lg h-12 ml-5 p-2 mr-3'
          placeholder='Search for deals e.g: Batman'
        />
        <BsSearch onClick={go} className='h-6 w-6' />
      </div>
    </div>
  )
}
