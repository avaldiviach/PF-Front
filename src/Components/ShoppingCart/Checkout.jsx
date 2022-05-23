import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeCart, getTotalPrice } from '../../Redux/Actions'

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //por si queremos hacer descuento con cupones
  const showCheckoutScreen = () => {
    dispatch(
      changeCart({
        showCheckoutScreen: true,
        showDiscountForm: false,
        discountCode: "",
        discountCodeValid: null,
      })
    );
    navigate('payment');
  }
  const discountCodeValid = useSelector(state => state.discountCodeValid)

  const totalPrice = useSelector(state => state.totalPrice);

  useEffect(() => {
    dispatch(getTotalPrice())
  }, [])

  // const productData = useSelector(state => state.productData)
  // const totalPrice = productData.reduce((value, acc) => {
  //   return value + (acc.price * acc.qty)
  // }, 0)
  // const detectChanges = useSelector(state => state.productData.map(product => product.qty))

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
          <p>Free</p>
        </div>
        <hr />

        <div className='flex justify-between font-bold'>
          <p >The total amount of <br />
            (including IVA)
          </p>

          {/* Si hay cupón de descuento se hace el descuento */}
          {discountCodeValid ?
            <div className='flex flex-col space-y-1 text-right'>
              <p className='text-gray-300 font-normal'><span className=' line-through '>${Number(totalPrice).toFixed(2)}</span> <span className=' text-green-600'>+50%</span></p>
              <p>${Number(totalPrice * 0.5).toFixed(2)}</p>
            </div> :
            <p>${Number(totalPrice).toFixed(2)}</p>
          }
        </div>
      </div>

      <button onClick={showCheckoutScreen} title={totalPrice === 0 ? "Please add item to your cart first" : ""} disabled={totalPrice === 0}
        className={totalPrice === 0
          ? 'bg-gray-200 text-black cursor-not-allowed text-xs p-4 w-full rounded-md'
          : 'bg-orange-600 text-white text-xs p-4 w-full rounded-md hover:bg-orange-700'} >
        {/* : ' bg-white text-orange-600 text-xs p-4 w-full rounded-md hover:bg-orange-600 border border-orange-600 hover:border-white hover:text-white'} > */}
        GO TO CHECKOUT
      </button>
    </div>
  )
}

export default Checkout