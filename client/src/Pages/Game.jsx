import { Badge } from '@tremor/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function Game () {
  const [game, setGame] = useState([])
  const [stores, setStores] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [dealStores, setDealStores] = useState([])
  const location = useLocation()
  const deal = location.state.deal

  const fetchGame = async () => {
    await fetch(`https://www.cheapshark.com/api/1.0/games?id=${deal.gameID}`)
      .then((response) => response.json()).then((data) => { setGame(data); setTimeout(() => { setLoading(false) }, 2000) }).catch((err) => console.log(err))
  }

  const fetchStores = async () => {
    await fetch('https://www.cheapshark.com/api/1.0/stores')
      .then((response) => response.json()).then((data) => setStores(data)).catch((err) => console.log(err))
  }

  const insertStores = () => {
    if (!isLoading) {
      setDealStores(game.deals.map((d) => stores.filter((s) => {
        return s.storeID.includes(d.storeID)
      })))
      console.log(dealStores)
    }
  }

  useEffect(() => {
    fetchGame()
    fetchStores()
  }, [])

  useEffect(() => {
    insertStores()
  }, [isLoading])

  return (
    <div className='w-full ml-48 h-screen flex items-center flex-col mt-5'>
      {isLoading
        ? (
          <p>Loading...</p>
          )
        : (
          <div className='w-3/4 flex flex-col items-center'>
            <p className='text-[32px] font-bold'>{game.info.title}</p>
            <img src={game.info.thumb} alt={game.info.title} className='mt-8' />
            <div className='w-full flex flex-col items-center mt-5'>
              <p className='text-xl underline'>List of deal stores:</p>
              {
                dealStores.length !== 0 && dealStores.map((ds) => (
                  ds.map((d) => (
                    <Badge className='bg-red-200' key={d.storeID} size='sm'>{d.storeName}</Badge>
                  ))
                ))
              }
            </div>
          </div>
          )}
    </div>
  )
}
