import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Payment() {

  const totalPrice = useSelector(state => state.totalPrice);

  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
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
      }).then(resp => resp.json()).then(resp => console.log(resp))
    }
    alert(error);
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
        PAGAR
      </button>
    </div>
  )
}


export default Payment;