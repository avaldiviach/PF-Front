import {
	GET_SNEAKERS,
	SEARCH_BY_NAME,
	FILTER_BY_BRAND,
	FILTER_BY_CATEGORY,
	GET_DETAIL,
	CLEAN_DETAIL,
	SORT_PRICE
} from '../Actions';

const initialState = {
	searchSneakers: '',
	Sneakers: [],
	SneakersCopy: [],
	filters: [],
	detail: [],
	allsneakers: [],

	productData: [
		{
			id: "sneaker1",
			name: "Black/White-Medium Grey",
			type: "BLABLA",
			price: "2000",
			otras: 'aaaa',
			notes: "max 100UN",
			max: 100,
			qty: 1,
			image: 'https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png',
			wishlisted: false
		},
		{
			id: "sneaker2",
			name: "Air Jordan 11 Retro 'Space Jam' 2016",
			type: "BLABLA",
			price: "1000",
			otras: 'aaaa',
			notes: "max 100UN",
			max: 100,
			qty: 1,
			image: 'https://image.goat.com/375/attachments/product_template_pictures/images/008/654/900/original/52015_00.png.png',
			wishlisted: false
		},
		{
			id: "sneaker3",
			name: "Rally Pro 'Black'",
			type: "BLABLA",
			price: "1500",
			otras: 'aaaa',
			notes: "max 100UN",
			max: 100,
			qty: 1,
			image: 'https://image.goat.com/375/attachments/product_template_pictures/images/015/567/335/original/CM100018M.png.png',
			wishlisted: false
		}
	],
	showDiscountForm: false,
	discountCode: "",
	discountCodeValid: null,
	showCheckoutScreen: false
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
				sneakerMatching = sneakerMatching.filter((s) =>s.match.toLowerCase().includes(w.toLowerCase()))
			});
			const msg = (sneakerMatching.length < 1) ? `The search '${payload}' not match whit our sneakers, try again ` : "finded";
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


		case 'SET_CART':
			return Object.assign({}, state, payload);

		default:
			return state;
	}
};

export default rootReducer;
