import axios from 'axios';
export const GET_SNEAKERS = 'GET_SNEAKERS',
	SEARCH_BY_NAME = 'SEARCH_BY_NAME',
	FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY',
	FILTER_BY_BRAND = 'FILTER_BY_BRAND',
	GET_DETAIL = 'GET_DETAIL',
	SET_CART = 'SET_CART',
	CLEAN_DETAIL = 'CLEAN_DETAIL',
	SORT_PRICE = 'SORT_PRICE';

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
const cartData = [
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
	},
];

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

export const addItem = () => {
	return async (dispatch) => {
		dispatch({
			type: SET_CART,
			payload: {
				productData: cartData,
			},
		});
	};
};

export const removeItem = (id) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;

		dispatch({
			type: SET_CART,
			payload: {
				productData: productData.filter((item) => {
					return item.id !== id;
				}),
			},
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


export const cleanDetail = () => {
	return {
		type: CLEAN_DETAIL,
	}
}


export const OrderingByPrice = (payload) => {
	return {
		type: SORT_PRICE,
		payload: payload
	}
}

// OrderingByPrice: async (req, res) => {
// 	const { order } = req.query
// 	const data = await getData()

// 	try {
// 			if (order === 'asc') {
// 					let newOrder = data.sort((a, b) => a.price - b.price)
// 					res.send(newOrder)
// 			} else {
// 					let newOrder = data.sort((a, b) => b.price - a.price)
// 					res.send(newOrder)
// 			}
// 	} catch (error) {
// 			console.log(error)
// 	}
// },