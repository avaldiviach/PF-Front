import {
  GET_SNEAKERS,
  SEARCH_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  GET_DETAIL,
  CLEAN_DETAIL,
  SORT_PRICE,
  SET_CART,
  REMOVE_ITEM_CART,
  SET_TOTAL_PRICE,
} from '../Actions';

const initialState = {
  searchSneakers: '',
  Sneakers: [],
  SneakersCopy: [],
  filters: [],
  detail: {},
  productData: [],
  totalPrice: 0,

  // Las propiedades de abajo son para el carrito en caso de que se quiera 
  // implementar cupones de descuento
  // showDiscountForm: false,
  // discountCode: '',
  // discountCodeValid: null,
  // showCheckoutScreen: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SNEAKERS:
      return {
        ...state,
        Sneakers: payload,
        SneakersCopy: payload,
        allsneakers: payload
      };

    case SEARCH_BY_NAME:
      const words = payload.split(' ');
      let sneakerMatching = state.allsneakers
      words.forEach(w => {
        sneakerMatching = sneakerMatching.filter((s) => s.match.toLowerCase().includes(w.toLowerCase()))
      });
      const msg = (sneakerMatching.length < 1) ? `The search '${payload}' not match with our sneakers, try again ` : "finded";
      return {
        ...state,
        SneakersCopy: sneakerMatching,
        searchSneakers: msg
      };

    case FILTER_BY_CATEGORY:
      //const filterCategory= state.SneakersCopy.filter((el)=> el.category.includes(payload))
      const filterCategory =
        payload === ''
          ? state.Sneakers
          : state.Sneakers.filter((el) => el.categories?.includes(payload));
      return {
        ...state,
        SneakersCopy: filterCategory,
      };

    case FILTER_BY_BRAND:
      // const filterBrand= state.SneakersCopy.filter((el)=> el.brand_name.toLowerCase()===payload)
      const filterBrand =
        payload === ''
          ? state.SneakersCopy
          : state.SneakersCopy.filter(
            (el) => el.brand.toLowerCase() === payload
          );
      return {
        ...state,
        SneakersCopy: filterBrand,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };

    case CLEAN_DETAIL: return { ...state, detail: [] }

    case SORT_PRICE:

      let sortByPrice = [...state.SneakersCopy];
      console.log(sortByPrice)

      if (payload === 'asc') {
        sortByPrice.sort((a, b) => a.price - b.price)
      } else {
        sortByPrice.sort((a, b) => b.price - a.price)
      }

      return {
        ...state, SneakersCopy: [...sortByPrice]
      }

    case SET_CART:
      return {
        ...state,
        ...payload,
      }
    //return Object.assign({}, state, payload);

    case REMOVE_ITEM_CART:
      return {
        ...state,
        productData: payload,
      }

    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: payload,
      }

    default:
      return state;
  }
};

export default rootReducer;