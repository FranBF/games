import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Games () {
  const [data, setData] = useState([])
  const [search, setSearch] = useState([])
  const [isLoading, setLoading] = useState(true)
  const params = useParams()
  const gameTitle = params.title

  const handleSearch = (e) => {
    const value = e.target.value

    if (value === '') {
      setSearch([])
      return data
    } else {
      setSearch(data.filter((d) => {
        return d.title.toLowerCase().includes(value.toLowerCase())
      }))
    }
    return data
  }

  const handleFetch = async () => {
    await fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`).then((response) => response.json())
      .then((data) => { console.log(data); setData(data); setLoading(false) }).catch((err) => console.log(err))
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <div className={`ml-48 w-full items-center ${search.length === 0 && 'justify-center '} ${isLoading | search.length !== 0 & search.length < 17 ? 'h-screen' : 'h-full'} flex flex-col`}>
      {isLoading
        ? (
          <p>Loading...</p>
          )
        : (
          <div className='flex flex-col w-3/4'>
            <div className='flex items-center justify-start w-full mt-5'>
              <p className='text-[35px] font-bold'>Games:</p>
              <input onChange={(e) => handleSearch(e)} className='w-3/4 text-black rounded-lg h-12 ml-5 p-2' placeholder='Search for deals e.g: Batman' />
            </div>
            <div className='grid grid-cols-6 gap-3 h-full justify-stretch items-center text-wrap mt-5'>
              {search.length === 0
                ? data.map((d) => (
                  <Link
                    to={`/game/${d.gameID}`}
                    state={{ deal: d }}
                    className='flex w-36 h-48 flex-col justify-center items-center text-center mb-2 border-[1px] border-sky-700 rounded-md
             bg-sky-600' key={d.dealID}
                  >
                    <img className='max-w-[90px] max-h-20' src={d.thumb} alt={d.title} />
                    <p className='mt-2'>{d.title}</p>
                  </Link>
                ))
                : search.map((d) => (
                  <Link
                    to={`/game/${d.gameID}`}
                    state={{ deal: d }}
                    className='flex w-36 h-48 flex-col justify-center items-center text-center mb-2 border-[1px] border-sky-700 rounded-md
             bg-sky-600' key={d.dealID}
                  >
                    <img className='max-w-[90px] max-h-20' src={d.thumb} alt={d.title} />
                    <p className='mt-2'>{d.title}</p>
                  </Link>
                ))}
            </div>
          </div>
          )}
    </div>
  )
}
