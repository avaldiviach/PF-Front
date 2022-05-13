import axios from 'axios';
export const GET_SNEAKERS = 'GET_SNEAKERS',
	SEARCH_BY_NAME = 'SEARCH_BY_NAME',
	FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY',
	FILTER_BY_BRAND = 'FILTER_BY_BRAND',
	GET_DETAIL = "GET_DETAIL"

export function getSneakers() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get('http://localhost:3001/sneakers');
			return dispatch({
				type: GET_SNEAKERS,
				payload: data,
			});
		} catch (error) {
			console.log('There is an error in getsneakers action', error);
		}
	};
}

export function searchByName(name) {
	return async function (dispatch) {
		try {
			if (name) {
				const { data } = await axios.get(`http://localhost:3001/sneakers?name=${name}`);
				return dispatch({
					type: SEARCH_BY_NAME,
					payload: data,
				});
			}
		} catch (error) {
			return dispatch({
				type: SEARCH_BY_NAME,
				payload: error,
			});
		}
	};
}

export function filterByCategory(category) {
	category = category.toLowerCase()
	return function (dispatch) {
		try {
			return dispatch({
				type: FILTER_BY_CATEGORY,
				payload: category,
			});
		} catch (error) {
			return dispatch({
				type: FILTER_BY_CATEGORY,
				payload: error,
			});
		}
	};
}

export function filterByBrand(brand) {
	return async function (dispatch) {
		brand = brand.toLowerCase();
		try {
			return dispatch({
				type: FILTER_BY_BRAND,
				payload: brand,
			});
		} catch (error) {
			return dispatch({
				type: FILTER_BY_BRAND,
				payload: error,
			});
		}
	};
}
export function getDetailSneaker(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`http://localhost:3001/sneakers/${id}`);
			return dispatch({
				type: GET_DETAIL,
				payload: data,
			});
		} catch (error) {
			console.log('There is an error in getDetailSneaker action', error);
		}
	};
}