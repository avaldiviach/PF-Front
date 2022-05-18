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
/* const cartData = [
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
  ]*/


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

export const addItem = (id) => (dispatch, getState) => {
	const rootReducer = getState();
	const { productData } = rootReducer;
	const check = productData?.some((product) => product.id === id);
	if (check) return;
	return fetch(`https://node-api-sneakers.herokuapp.com/sneaker/${id}`)
		.then((resp) => resp.json())
		.then((data) =>
			dispatch({
				type: SET_CART,
				payload: [
					{
						id: data.id,
						name: data.model,
						type: data.categories.join(', '),
						price: data.price,
						otras: data.description,
						notes: data.match,
						max: 100,
						qty: 1,
						image: data.image,
						wishlisted: false,
					},
				],
			})
		);
};

/* export const addItem = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_CART,
      payload: {
        productData: cartData,
      },
    });
  };
}; */

export const removeItem = (id) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;

		dispatch({
			type: REMOVE_ITEM_CART,
			payload: productData.filter((item) => item.id !== id),
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
