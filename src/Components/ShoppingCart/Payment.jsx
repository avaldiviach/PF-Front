import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import ModalCart from "../Modal/modalCart";
import { createOrder } from '../../Redux/Actions';
import s from './cart.module.css'

function Payment({user}) {

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [address, setAddress] = useState('');

  const totalPrice = useSelector(state => state.totalPrice);
  const productData = useSelector(state => state.productData)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const onChangeAd = (e)=>{
    e.preventDefault()
    setAddress(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    console.log(paymentMethod)
    if (!error) {
      console.log('elements', productData)
      console.log('user', user.email)
      await dispatch(createOrder({
        email: user.email,
        address: address,
        products: productData,
        total: totalPrice
      }));
      return fetch(`https://node-api-sneakers.herokuapp.com/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: paymentMethod.id,
          amount: totalPrice
        })
      })
        .then(resp => resp.json())
        .then(({ msg, received }) => {
          setLoading(false);
          setAlert({
            title: 'Transaction',
            msg,
            goCart: false
          });
          elements.getElement(CardElement).clear();
          if (received) {
            //falta agregar una ruta para recibir los productos que han sido comprados y registrar en la BD
            dispatch({ type: 'SET_CART', payload: { productData: [] } });
            dispatch({ type: 'SET_TOTAL_PRICE', payload: 0 });

            setTimeout(() => navigate('/cart'), 3000);
          }
        });
    }
    elements.getElement(CardElement).clear();
    setLoading(false);
    setAlert({
      title: 'Error',
      msg: error.message,
      goCart: false
    });
  }

  return (
    <div>
      {
        alert && <ModalCart active={true} msg={alert.msg} title={alert.title} reset={setAlert} goCart={alert.goCart} />
      }
      <div className='h-full bg-white p-4 rounded-md shadow-lg space-y-4 mb-7'>
        <p>Insert Addres</p>
        <input type='text' class="form-control" placeholder='Insert your address...' onChange={onChangeAd}></input>
      </div>
      <CardElement />
      <button
        className={`bg-orange-600 text-white text-xs p-4 w-full rounded-md hover:bg-orange-700 mt-3`}
        onClick={handleSubmit}
        type="submit"
        disabled={!stripe || !elements}
      >
        {
          loading ? <>VERIFYING</> : <>BUY</>
        }
      </button>
    </div>
  )
}

export default Payment;