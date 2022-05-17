import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCart } from '../../Redux/Actions'

const Checkout = () => {
  const dispatch = useDispatch()

  const showCheckoutScreen = () => {
    dispatch(
      changeCart({
        showCheckoutScreen: true,
        showDiscountForm: false,
        discountCode: "",
        discountCodeValid: null,
      })
    )
  }

  const productData = useSelector(state => state.productData)
  const discountCodeValid = useSelector(state => state.discountCodeValid)
  // const { productData, discountCodeValid } = state

  const totalPrice = productData.reduce((value, acc) => {
    return value + (acc.price * acc.qty)
  }, 0)

  return (
    <div className='bg-white p-4 rounded-md shadow-lg h-full space-y-6 '>
      <h2 className='text-gray-800 font-bold text-lg'>The total amount of</h2>
      <div className='space-y-3 text-gray-600 text-sm'>
        <div className='flex items-center justify-between'>
          <p>Temporary amount</p>
          <p>${Number(totalPrice).toFixed(2)}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Shipping</p>
          <p>Gratis</p>
        </div>
        <hr />
        <div className='flex justify-between font-bold'>
          <p >The total amount of <br />
            (including VAT)
          </p>
          {discountCodeValid ?
            <div className='flex flex-col space-y-1 text-right'>
              <p className='text-gray-300 font-normal'><span className=' line-through '>${Number(totalPrice).toFixed(2)}</span> <span className=' text-green-600'>+50%</span></p>
              <p>${Number(totalPrice * 0.5).toFixed(2)}</p>
            </div> :
            <p>${Number(totalPrice).toFixed(2)}</p>
          }
        </div>
      </div>
      <button onClick={showCheckoutScreen} title={totalPrice === 0 ? "Please add item to your cart first" : ""} disabled={totalPrice === 0} className={totalPrice === 0 ?
        'bg-gray-200 text-black cursor-not-allowed text-xs p-4 w-full rounded-md' :
        ' bg-blue-600 text-white text-xs p-4 w-full rounded-md hover:bg-blue-700'} >
        GO TO CHECKOUT
      </button>
    </div>
  )
}

export default Checkout
