import { Link } from 'react-router-dom'
import { FaGamepad, FaStore } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'

export function SideBar () {
  const color = '#0EA5E9'
  const handleColor = (e) => {
    console.log(e.target)
    if (e.target !== 'null') {
      e.target.addEventListener('mouseenter', (evt) => {
        evt.target.children[0].setAttribute('style', `color:${color}`)
      })
      e.target.addEventListener('mouseleave', (evt) => {
        evt.target.children[0].setAttribute('style', 'color:inherit')
      })
    }
  }

  return (
    <div className='w-48 fixed let-0 top-0 bg-[#0F172A] h-full flex flex-col border-r-[1px] border-gray-400'>
      <Link to='/'><h1 className='font-bold text-xl p-2'>GameMrkt</h1></Link>
      <Link
        to='/deals' className='w-full h-8 rounded-lg items-center flex' onMouseOver={(e) => handleColor(e)}
      >
        <MdAttachMoney className='ml-2 w-6 h-6' />
        <span className='ml-2'>Deals</span>
      </Link>
      <Link
        className='w-full h-8 rounded-lg items-center flex' onMouseOver={(e) => handleColor(e)}
      >
        <FaGamepad className='ml-2 w-6 h-6' />
        <span className='m-2'>Games</span>
      </Link>
      <Link className='w-full h-8 rounded-lg items-center flex' onMouseOver={(e) => handleColor(e)}>
        <FaStore className='ml-2 w-6 h-6' />
        <span className='m-2'>Stores</span>
      </Link>
    </div>
  )
}
