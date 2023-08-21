import { Badge } from '@tremor/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function Game () {
  const [game, setGame] = useState([])
  const [stores, setStores] = useState([])
  const [isLoading, setLoading] = useState(true)
  const ds = []
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
      for (let i = 0; i < game.deals.length; i++) {
        for (let k = 0; k < stores.length; k++) {
          if (game.deals[i].storeID === stores[k].storeID) {
            ds.push({ storeID: stores[k].storeID, storeName: stores[k].storeName, icon: stores[k].images.icon })
          }
        }
      }
      console.log(ds.map((d) => d.storeName))
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
            <img src={game.info.thumb} alt={game.info.title} className='mt-8 max-w-[240px] max-h-[480px]' />
            <div className='w-full flex flex-col items-center mt-5'>
              <p className='text-xl font-bold mb-5'>Price: {game.cheapestPriceEver.price}€</p>
              <p className='text-xl underline'>List of deal stores:</p>
              <div className='flex w-full'>
                {
                  ds.map((d) => (
                    <Badge key={d.storeID} size='sm'>{d.storeName}</Badge>
                  ))
                }
              </div>
            </div>
          </div>
          )}
    </div>
  )
}
