import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCart } from '../../Redux/Actions'
import Cart from './Cart.jsx'

const Home = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector(state => state.rootReducer)

  const { showCheckoutScreen } = rootReducer


  useEffect(() => {
    if (showCheckoutScreen) {
      const setShowCheckout = setTimeout(() => {
        dispatch(changeCart({
          showCheckoutScreen: false,
          productData: []
        }))
      }, 5000)

      return () => { clearTimeout(setShowCheckout) }
    }
  }, [showCheckoutScreen, dispatch])

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 '>
      {showCheckoutScreen ?

        <main className='py-6 px-12 w-full items-center flex-1 flex flex-col justify-center'>
          <div className='space-x-8 flex items-center'>
            <span className='text-6xl text-green-600'>
              <i className='far fa-check-circle'></i>
            </span>
            <h3 className='text-2xl font-semibold'>Thanks for shopping with us!</h3>
          </div>
        </main>

        :

        <Cart />

      }
    </div>
  )
}

export default Home