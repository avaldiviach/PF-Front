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
	GET_ALL_USERS,
	DELETE_USER,
	CREATE_MODEL,
	GET_CATEGORIES,
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	GET_MODELS,
	GET_BRANDS,
	GET_MATERIALS,
	GET_COLORS,
	GET_SIZES
} from '../Actions';

const initialState = {
	searchSneakers: '',
	Sneakers: [],
	SneakersCopy: [],
	filters: [],
	detail: {},
	productData: [],
	totalPrice: 0,
	users: [],
	categories: [],
	createModel: [],
	getModels: [],
	getBrands: [],
	getMaterials: [],
	getColors: [],
	getSizes: [],
	productData: [...JSON.parse(localStorage.getItem('productData')) || []],
	totalPrice: 0,

	// Las propiedades de abajo son para el carrito en caso de que se quiera 
	// implementar cupones de descuento
	// showDiscountForm: false,
	// discountCode: '',
	// discountCodeValid: null,
	// showCheckoutScreen: false,

	// Las propiedades de abajo son para el carrito en caso de que se quiera 
	// implementar cupones de descuento
	showDiscountForm: false,
	discountCode: '',
	discountCodeValid: null,
	showCheckoutScreen: false,
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
					? state.Sneakers
					: state.Sneakers.filter(
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

    case 'GET_CART_BD':
      return {
        ...state,
        productData: [...state.productData, ...payload],
      }

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
		//-------------------ADMIN------------------ADMIN--------------------ADMIN
		case GET_ALL_USERS:

			return {
				...state,
				users: payload
			};

		case DELETE_USER:
			let user = [...state.users]

			return {
				...state,
				users: user.filter(el => el.id !== payload)
			}

		case CREATE_MODEL:

			return {
				...state,
				createModel: payload
			}

		case GET_CATEGORIES:

			let catego = state.categories

			console.log(catego)
			return {
				...state,
				categories: payload
			}

		case CREATE_CATEGORY:

			return {
				...state,
				categories: payload
			}

		case DELETE_CATEGORY:

			let category = state.categories

			return {
				...state,
				categories: category.filter(el => el.id !== payload)
			}

		case GET_MODELS:

			return {
				...state,
				getModels: payload
			}

		case GET_BRANDS:

			return {
				...state,
				getBrands: payload
			}

		case GET_MATERIALS:

			return {
				...state,
				getMaterials: payload
			}


		case GET_COLORS:

			return {
				...state,
				getColors: payload
			}

		case GET_SIZES:

			return {
				...state,
				getSizes: payload
			}

		default:
			return state;
	}
};

export default rootReducer;
