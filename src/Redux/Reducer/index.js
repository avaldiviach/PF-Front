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
			return {
				...state,
				Sneakers: payload,
				searchSneakers: payload,
			};

		case FILTER_BY_CATEGORY:
			//const filterCategory= state.SneakersCopy.filter((el)=> el.category.includes(payload))
			const filterCategory = payload === "" ? state.SneakersCopy : state.SneakersCopy.filter((el) => el.category.includes(payload))
			return {
				...state,
				Sneakers: filterCategory,
			};

		case FILTER_BY_BRAND:
			// const filterBrand= state.SneakersCopy.filter((el)=> el.brand_name.toLowerCase()===payload)
			const filterBrand = payload === "" ? state.SneakersCopy : state.SneakersCopy.filter((el) => el.brand_name.toLowerCase() === payload)
			return {
				...state,
				Sneakers: filterBrand,
			};

		case GET_DETAIL:
			return {
				...state,
				detail: payload,
			};

		default:
			return state;
	}
};

export default rootReducer;