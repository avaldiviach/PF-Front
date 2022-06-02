import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemQuantity,
  decreaseItemQuantity,
  addWishlist,
  removeItem,
  getTotalPrice,
} from "../../Redux/Actions";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import s from './cart.module.css'


const Product = ({ data, index }) => {
  const dispatch = useDispatch()
  const [toDelete, setToDelete] = useState(false)

  const { sneakerId, name, brand, categories, price, description, qty, image, size, max, discountPrice } = data

  const user = useSelector(state => state.getUser);
  const wishlist = useSelector(state => state.wishlistData.find(e => e.id === sneakerId));
  const token = useSelector(state => state.getToken )


  // para forzar el reenderizado de los componentes cuando se agrega un producto al carrito,
  // se borra etc.
  const [any, forceUpdate] = useReducer(num => num + 1, 0);
  const offer = useSelector((state) => state.offer);

  const addProductQtyHandler = () => {
    dispatch(addItemQuantity(index));
    dispatch(getTotalPrice());
    forceUpdate();
  };

  const removeProductQtyHandler = () => {
    dispatch(decreaseItemQuantity(index));
    dispatch(getTotalPrice());
    forceUpdate();
  };

  // agregar a la lista de deseos
  /*   const wishlistHandler = () => {
      dispatch(addWishlist(index))
      forceUpdate();
    } */

  // remover item
  const removeItemHandler = () => {
    setToDelete(true);
    setTimeout(() => {
        dispatch(removeItem(sneakerId, size, user?.email, token))
      dispatch(getTotalPrice());
      setToDelete(false);
    }, 300);
  };
  return (
    <div className={`flex justify-between flex-col lg:flex-row space-y-4 lg:space-y-0 transition-opacity ease-in-out duration-700 ${toDelete ? ' opacity-0 ' : 'opacity-100'}`}>
      <div className='space-y-4 lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row'>
        <img src={image} alt='img-product' className={`w-full lg:w-48 ${s.img} `} />
        <span title={wishlist?.wishlisted ? `it's already on your wishlist` : `add it to your wishlist`} >
          {
            wishlist?.wishlisted ? <FaHeart color='red' /> : <FaRegHeart />
          }
        </span>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-gray-800 text-xl font-semibold'>{name}</h3>
            <h3 className='text-gray-800 text-xl font-semibold'>{brand}</h3>
            <h4 className='text-sm text-gray-900'>Size {size}</h4>
            <p className='text-sm text-gray-600'>{categories}</p>
            <p className='text-sm text-gray-600'>{description}</p>
            <p className='text-gray-600'>
              {
                discountPrice > 0
                  ? <>${Number(discountPrice).toFixed(2)}</>
                  : offer[0].id === sneakerId && offer[0].size === size
                    ? (<> ${Number(price).toFixed(2)}{` `} <del>${Number(price * 1.25).toFixed(2)}</del> </>)
                    : <>${Number(price).toFixed(2)}</>
              }
              <span className='text-sm'>/ Unit</span>
            </p>
            <div className='flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 text-gray-600 '>
              <div onClick={removeItemHandler} className='flex items-center space-x-1 text-xs lg:text-sm hover:text-gray-400 cursor-pointer'>
                <span>
                  <i className="fas fa-trash"></i>
                </span>
                <p style={{ color: 'red' }}>REMOVE ITEM</p>
              </div>
              {/* por si queremos agregar lista de deseos */}
              {/* <div onClick={wishlistHandler} className={wishlisted ? 'flex items-center space-x-1 text-xs lg:text-sm text-red-600 cursor-pointer' : 'flex items-center space-x-1 text-xs lg:text-sm hover:text-red-600 cursor-pointer'}>
                <p>{wishlisted ? "REMOVE FROM WISHLIST" : "MOVE TO WISHLIST"}</p>
              </div> */}
            </div>
          </div >
        </div >

        <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-gray-800 text-xs lg:text-base ">
              <div
                onClick={removeProductQtyHandler}
                className={
                  qty === 1
                    ? "cursor-not-allowed flex justify-center w-10 h-full items-center p-2 hover:bg-gray-50 border rounded-l-md text-gray-500"
                    : "cursor-pointer flex justify-center w-10 h-full items-center p-2 hover:bg-gray-200 border rounded-l-md"
                }
              >
                <span>
                  <GrFormSubtract />
                </span>
              </div>
              <div className="flex justify-center w-12 h-full items-center p-1 border-t border-b">
                {qty}
              </div>
              <div
                onClick={addProductQtyHandler}
                className={
                  max === qty
                    ? "cursor-not-allowed flex justify-center w-10 h-full items-center p-2 hover:bg-gray-50 border rounded-r-md text-gray-500"
                    : "cursor-pointer flex justify-center w-10 h-full items-center p-2 hover:bg-gray-200 border rounded-r-md"
                }
              >
                <span>
                  <GrFormAdd />
                </span>
              </div>
            </div>
            {/*  <p className='text-xs text-gray-600 mt-2'>(Note, {notes})</p> */}
          </div>
          {
            discountPrice > 0
              ? <p className='items-center text-gray-800 text-right text-lg font-semibold'>${Number(discountPrice * qty).toFixed(2)}</p>

              : <p className='items-center text-gray-800 text-right text-lg font-semibold'>${Number(price * qty).toFixed(2)}</p>

          }

        </div>
      </div >
    </div >

  )
}

export default Product;