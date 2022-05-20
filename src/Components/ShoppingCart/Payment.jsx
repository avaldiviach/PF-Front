import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function Payment() {

  const [loading, setLoading] = useState(false);
  const totalPrice = useSelector(state => state.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    setLoading(true);
    elements.getElement(CardElement).clear();
    if (!error) {
      return fetch(`http://localhost:3001/payment`, {
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
          alert(msg);
          if (received) {
            //falta agregar una ruta para recibir los productos que han sido comprados y registrar en la BD
            dispatch({ type: 'SET_CART', payload: { productData: [] } });
            dispatch({ type: 'SET_TOTAL_PRICE', payload: 0 });
            navigate('/cart');
          }
        });
    }
    setLoading(false);
    alert(error.message);
  }

  return (
    <div>
      <CardElement />
      <button
        className={`bg-orange-600 text-white text-xs p-4 w-full rounded-md hover:bg-green-700`}
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