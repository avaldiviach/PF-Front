import { addItem, addItemQuantity } from '../../Redux/Actions/index.js'
import Product from './Product.jsx'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from './Checkout.jsx'
import Discount from './Discount.jsx'

const Cart = () => {

  const dispatch = useDispatch()
  const productData = useSelector(state => state.productData)
  // const { productData } = state

  const addItemHandler = () => {
    dispatch(addItemQuantity())
  }

  return (
    <main className='py-6 px-12 w-full flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6'>

      <section className=' h-full lg:w-2/3 bg-white p-4 rounded-md shadow-lg space-y-4'>
        {/* titulo total de elementos en carrito */}
        <h2 className='text-gray-800 font-bold text-lg'>Cart ({productData.length} {productData.length <= 1 ? "item" : "items"})</h2>

        {/* Si carrito esta vacio manda mensaje 
        sino renderiza los productos*/}
        {
          productData.length === 0 ?
            <>
              <div className='flex items-center space-y-4 flex-col'>
                <h3 className='text-gray-500 text-lg font-semibold'>Oops... Seems your cart is empty</h3>
                <button onClick={addItemHandler} className=' bg-white text-orange-600 text-xs p-4 w-full lg:w-auto rounded-md hover:bg-orange-600 border border-orange-600 hover:border-white hover:text-white'>
                  ADD ITEMS
                </button>
              </div>
            </>
            : productData && productData.map((item, index) => (
              <React.Fragment key={index}>
                <Product data={item} index={index} />
                {productData.length - 1 === index ? null : <hr />}
              </React.Fragment>
            ))}

      </section>

      {/* llama a los componentes checkout y discount */}
      <section className='lg:w-1/3 h-full space-y-6 '>
        <Checkout />
        {/* <Discount /> */}
      </section>
    </main>
  )
}

export default Cart;