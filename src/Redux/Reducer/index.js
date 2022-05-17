import {
	GET_SNEAKERS,
	SEARCH_BY_NAME,
	FILTER_BY_BRAND,
	FILTER_BY_CATEGORY,
	GET_DETAIL,
} from '../Actions';

const initialState = {
	searchSneakers: [],
	Sneakers: [],
	SneakersCopy: [],
	filters: [],
	detail: [],
  
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
			};

		case SEARCH_BY_NAME:
			const sneakerMatching = state.SneakersCopy.filter((s) =>
				s.match.toLowerCase().includes(payload.toLowerCase())
			);
			return {
				...state,
				Sneakers: sneakerMatching,
			};

		case FILTER_BY_CATEGORY:
			//const filterCategory= state.SneakersCopy.filter((el)=> el.category.includes(payload))
			const filterCategory =
				payload === ''
					? state.SneakersCopy
					: state.SneakersCopy.filter((el) => el.categories?.includes(payload));
			return {
				...state,
				Sneakers: filterCategory,
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
				Sneakers: filterBrand,
			};

		case GET_DETAIL:
			return {
				...state,
				detail: payload,
			};

		case 'SET_CART':
			return Object.assign({}, state, payload);

		default:
			return state;
	}
};

export default rootReducer;
