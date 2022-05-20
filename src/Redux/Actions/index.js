import axios from 'axios';
export const GET_SNEAKERS = 'GET_SNEAKERS',
	SEARCH_BY_NAME = 'SEARCH_BY_NAME',
	FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY',
	FILTER_BY_BRAND = 'FILTER_BY_BRAND',
	GET_DETAIL = 'GET_DETAIL',
	SET_CART = 'SET_CART',
	REMOVE_ITEM_CART = 'REMOVE_ITEM_CART',
	SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export function getSneakers() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get('https://node-api-sneakers.herokuapp.com/sneakers');
			return dispatch({
				type: GET_SNEAKERS,
				payload: data,
			});
		} catch (error) {
			console.log('There is an error in getsneakers action', error);
		}
	};
}

export function getDetailSneaker(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`https://node-api-sneakers.herokuapp.com/sneaker/${id}`);
			return dispatch({
				type: GET_DETAIL,
				payload: data,
			});
		} catch (error) {
			console.log('There is an error in getDetailSneaker action', error);
		}
	};
}


export function searchByName(name) {
	return {
		type: SEARCH_BY_NAME,
		payload: name,
	};
}

export function filterByCategory(category) {
	return {
		type: FILTER_BY_CATEGORY,
		payload: category,
	};
}

export function filterByBrand(brand) {
	return {
		type: FILTER_BY_BRAND,
		payload: brand.toLowerCase(),
	};
}

//ACA EMPIEZA EL CARRITO DE COMPRAS
export const addWishlist = (index) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;
		let wishlistData = productData[index].wishlisted;

		dispatch({
			type: SET_CART,
			payload: (productData[index].wishlisted = !wishlistData),
		});
	};
};

export const addItemQuantity = (index) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;
		let maxData = productData[index].max;

		if (productData[index].qty >= maxData) {
			return false;
		} else {
			dispatch({
				type: SET_CART,
				payload: (productData[index].qty = productData[index].qty + 1),
			});
		}
	};
};

export const decreaseItemQuantity = (index) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;

		if (productData[index].qty <= 1) {
			return false;
		} else {
			dispatch({
				type: SET_CART,
				payload: (productData[index].qty = productData[index].qty - 1),
			});
		}
	};
};

export const addItem = (data) => (dispatch, getState) => {
	const rootReducer = getState();
	const { productData } = rootReducer;
	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
	const exist = productData?.some(product => product.id === data.id && product.size === data.sizes.size);
	if (exist) return exist;
	dispatch({
		type: SET_CART,
		payload: {
			productData: [...productData, {
				id: data.id,
				name: data.model,
				brand: data.brand,
				categories: formatter.format(data.categories),
				price: data.price,
				description: data.description,
				size: data.sizes.size,
				max: data.sizes.stock,
				qty: 1,
				image: data.image,
				wishlisted: false
			}]
		},
	})
};

export const removeItem = (id, size) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;
		dispatch({
			type: REMOVE_ITEM_CART,
			payload: productData.filter(product => product.id !== id || product.size !== size),
		});
	};
};

export const changeCart = (data) => {
	return async (dispatch) => {
		dispatch({
			type: SET_CART,
			payload: data,
		});
	};
};

export const getTotalPrice = () => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;
		let total = 0;
		productData.forEach((item) => {
			total += item.price * item.qty;
		});
		dispatch({
			type: SET_TOTAL_PRICE,
			payload: total,
		});
	};
};