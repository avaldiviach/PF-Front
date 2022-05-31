import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//Componentes y funciones
import Product from './Product.jsx'
import Checkout from './Checkout.jsx'
import Discount from './Discount.jsx'


const Cart = () => {
  
  const navigate = useNavigate();
  const stripePromise = loadStripe('pk_test_51L1JdXFZiSHIoXAAAndrHsoSn3sisOhE0eaNxnNL0dvtv7O8BBAGO0AgyB1r2EjojYKl8QtSA3GJfKXDnCrSLbzE00VAlNOvG7');
  const productData = useSelector(state => state.productData)
<<<<<<< HEAD

=======
  
>>>>>>> 5371dcfbd647c36527a4e1814823e863d4eaf319
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
                <button onClick={() => navigate('/')} className='bg-orange-600 text-white text-xs p-3 lg:w-auto rounded-md hover:bg-orange-700'>

                  {/* bg-white text-orange-600 text-xs p-4 w-full lg:w-auto rounded-md hover:bg-orange-600 border border-orange-600 hover:border-white hover:text-white' */}
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
        <Discount />
        <Elements stripe={stripePromise}>
          <Outlet />
        </Elements>
      </section>
    </main>
  )
}

export default Cart;
