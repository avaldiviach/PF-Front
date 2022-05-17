import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCart } from '../../Redux/Actions'


const Discount = () => {

  const dispatch = useDispatch()

  const showDiscountForm = useSelector(state => state.showDiscountForm)
  const discountCode = useSelector(state => state.discountCode)
  const discountCodeValid = useSelector(state => state.discountCodeValid)
  // const { showDiscountForm, discountCode, discountCodeValid } = rootReducer

  const openDiscountForm = () => {
    dispatch(changeCart({
      showDiscountForm: !showDiscountForm
    }))
  }

  const sendDiscountCodeValidation = () => {
    if (discountCode === "RAMEN") {
      dispatch(changeCart({
        discountCodeValid: true
      }))
    } else {
      dispatch(changeCart({
        discountCodeValid: false
      }))
    }
  }

  return (
    <div className='w-full'>
      <div className={showDiscountForm ? 'bg-white p-4 rounded-t-md shadow-lg h-full' : 'bg-white p-4 rounded-md shadow-lg h-full'}>
        <div className='flex items-center justify-between text-gray-600 text-sm'>
          <p>Add a discount code [optional]</p>
          <span onClick={openDiscountForm} className={showDiscountForm ? ' transition duration-700 transform rotate-180 cursor-pointer' : 'transition duration-700 transform rotate-0 cursor-pointer '}>
            <i className={"fas fa-chevron-down"}></i>
          </span>
        </div>
      </div>
      {showDiscountForm &&
        <div className=' bg-white px-4 pb-4 h-full space-y-2'>
          <div className='flex justify-between text-gray-600 text-sm space-x-2 h-full items-stretch'>
            <input defaultValue={discountCode} onChange={e => {
              dispatch(changeCart({
                discountCode: e.target.value.toUpperCase(),
                discountCodeValid: null
              }))

            }} placeholder='Type discount code...'
              className='rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent p-2 w-full bg-white border border-gray-400' />
            <button onClick={sendDiscountCodeValidation} title={discountCode === "" ? "Please, type discount code first" : ""} disabled={discountCode === ""} className={discountCode === '' ? "bg-gray-200 text-black cursor-not-allowed text-xs py-2 px-4 w-auto rounded-md" : 'bg-blue-600 text-white text-xs py-2 px-4 w-auto rounded-md hover:bg-blue-700'}>
              ADD
            </button>
          </div>

          {discountCodeValid !== null &&
            <div className='space-x-2 flex items-center'>
              <span className={discountCodeValid ? 'text-green-600 text-lg' : 'text-red-600 text-lg'}>
                <i className={discountCodeValid ? "far fa-check-circle" : "far fa-times-circle"}></i>
              </span>
              <p className='text-sm text-gray-600'>{discountCodeValid ? "Congratulation you've got 50% discounts off!" : 'Sorry wrong code, try again!'}</p>
            </div>
          }
        </div>}
    </div>
  )
}

export default Discount