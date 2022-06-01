import axios from 'axios';
export const GET_SNEAKERS = 'GET_SNEAKERS',
	SEARCH_BY_NAME = 'SEARCH_BY_NAME',
	FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY',
	FILTER_BY_BRAND = 'FILTER_BY_BRAND',
	GET_DETAIL = 'GET_DETAIL',
	SET_CART = 'SET_CART',
	CLEAN_DETAIL = 'CLEAN_DETAIL',
	SORT_PRICE = 'SORT_PRICE',
	REMOVE_ITEM_CART = 'REMOVE_ITEM_CART',
	SET_TOTAL_PRICE = 'SET_TOTAL_PRICE',
	GET_ALL_USERS = "GET_ALL_USERS",
	DELETE_USER = "DELETE_USER",
	CREATE_MODEL = "CREATE_MODEL",
	GET_CATEGORIES = "GET_CATEGORIES",
	GET_MODELS = "GET_MODELS",
	CREATE_CATEGORY = "CREATE_CATEGORY",
	DELETE_CATEGORY = "DELETE_CATEGORY",
	GET_MATERIALS = "GET_MATERIALS",
	GET_COLORS = "GET_COLORS",
	GET_SIZES = "GET_SIZES",
	DELETE_SNEAKER = "DELETE_SNEAKER",
	CREATE_SNEAKER = "CREATE_SNEAKER",
	UPDATE_SNEAKER = "UPDATE_SNEAKER",
	GET_BRANDS = "GET_BRANDS",
	CREATE_REVIEW = 'CREATE_REVIEW',
	GET_ALL_REVIEWS = 'GET_ALL_REVIEWS',
	GET_ALL_ORDERS = 'GET_ALL_ORDERS',
	GET_ORDER_BY_ID = 'GET_ORDER_BY_ID',
	CREATE_ORDER = 'CREATE_ORDER',
	CREATE_USER = 'CREATE_USER',
	GET_ROLE = 'GET_ROLE',
	GET_TOKEN = 'GET_TOKEN',
	GET_USER = 'GET_USER',
	RESET = 'RESET';
const localURL = "http://localhost:3001";

export function getSneakers() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`${localURL}/sneakers`);
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
			const { data } = await axios.get(`${localURL}/sneaker/${id}`);
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
	const formatter = new Intl.ListFormat('en', {
		style: 'long',
		type: 'conjunction',
	});
  
	const exist = productData?.every(
		(product) => product.id !== data.id && product.size !== data.sizes.size
	);
	if (!exist) return !exist;
	dispatch({
		type: SET_CART,
		payload: {
			productData: [
				...productData,
				{
					sneakerId: data.id,
					name: data.model,
					brand: data.brand,
					categories: formatter.format(data.categories),
					price: data.price,
					description: data.description,
					size: data.sizes.size,
					max: data.sizes.stock,
					qty: 1,
					image: data.image,
					wishlisted: false,
				},
			],
		},
	});
};

export const removeItem = (id, size, email,token) => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;
		const payload = productData.filter((product) => product.id !== id || product.size !== size)
		const data = {
			email,
			productData: payload
		}
		if (email) axios.post(`${localURL}/deletecart`, data.email,			
			{
				headers: { authorization: `Bearer ${token}`}
			}
		);
		dispatch({
			type: REMOVE_ITEM_CART,
			payload
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
	};
};

export const OrderingByPrice = (payload) => {
	return {
		type: SORT_PRICE,
		payload: payload,
	};
};

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

export const getTotalPrice = () => {
	return async (dispatch, getState) => {
		const rootReducer = getState();
		const { productData } = rootReducer;
		let total = 0;
		productData.forEach((item) => {
			total += item.price * item.qty;
		});

		//agregar productData al local storage
		localStorage.setItem('productData', JSON.stringify(productData));

		dispatch({
			type: SET_TOTAL_PRICE,
			payload: total,
		});
	};
};
//------------ADMIN----------------ADMIN------------ADMIN
export function getAllUsers(token) {
	return async function (dispatch) {
		try {
			console.log(token)
			const { data } = await axios.get(
				`${localURL}/getUser`,
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: GET_ALL_USERS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//deleteUsers

export function deleteUser(id, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(
				`${localURL}/deleteUser/${id}`,			
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);

			return dispatch({
				type: DELETE_USER,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//createModel

export function createModel(payload, token) {
	return async function (dispatch) {
		try {
			console.log(payload);
			const { data } = await axios.post(
				`${localURL}/createModel`,
				payload,
			
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: CREATE_MODEL,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createSneaker(payload, token) {
	return async function (dispatch) {
		try {
			console.log(payload);
			const { data } = await axios.post(
				`${localURL}/createSneaker`,
				payload,
			
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: CREATE_SNEAKER,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//getCategories

export function getCategories() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/categories`
			);
			return dispatch({
				type: GET_CATEGORIES,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//create category para el form de create model

export function createCategory(payload,token) {
	return async function (dispatch) {
		try {
			const newCategory = { nameCategory: payload };
			const { data } = await axios.post(
				`${localURL}/createCate`,
				newCategory,
			
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: CREATE_CATEGORY,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//delete category

export function deleteCategory(id, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(
				`${localURL}/deleteCategory/${id}`,
			
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);

			return dispatch({
				type: DELETE_CATEGORY,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getModels() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/getmodels`
			);
			return dispatch({
				type: GET_MODELS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getBrands() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/brands`
			);
			return dispatch({
				type: GET_BRANDS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getMaterials() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/materials`
			);

			return dispatch({
				type: GET_MATERIALS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getColors() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/getColors`
			);

			return dispatch({
				type: GET_COLORS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//getSizes cambiar a heroku

export function getSizes() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/sizes`
			); return dispatch({
				type: GET_SIZES,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function deleteSneaker(id, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(`${localURL}/deleteSneaker/${id}`,			
				{
					headers: { authorization: `Bearer ${token}`}
				})
			return dispatch({
				type: DELETE_SNEAKER,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	}
};


export function updateSneaker(id, payload, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(`${localURL}/updatesneaker/${id}`, payload,			
				{
					headers: { authorization: `Bearer ${token}`}
				})
			return dispatch({
				type: UPDATE_SNEAKER,
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}
}


export function createReview(payload, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.post(
				`${localURL}/review`,
				payload,			
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: CREATE_REVIEW,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function getAllreviews(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/reviews/${id}`
			);
			return dispatch({
				type: GET_ALL_REVIEWS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}


export function getOrders(token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/getOrders`,
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: GET_ALL_ORDERS,
        payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createUser(payload, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.post(
				`${localURL}/user`,
				payload
			);
			dispatch(getRole(data.uid,token));
			return dispatch({
				type: CREATE_USER,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getOrderById(id, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`${localURL}/getOrders/${id}`,
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: GET_ORDER_BY_ID,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createOrder(payload, token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.post(
				`${localURL}/createOrder`,payload,
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: CREATE_ORDER,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function updateOrder(id, status,token) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(
				`${localURL}/updateOrder/${id}`, {newStatus: status},
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: 'UPDATE_ORDER',
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}


export function getRole(id, token){
	return async function(dispatch){
		if(!id){
			return dispatch({
				type: GET_ROLE,
				payload: "guest",
			});
		}
		try {
			const { data } = await axios.get(
				`${localURL}/role/${id}`,
				{
					headers: { authorization: `Bearer ${token}`}
				}
			);
			return dispatch({
				type: GET_ROLE,
				payload: data,
			});
		} catch (error) {
			console.log(error)
		}
	}
}


export function getToken(token){			
	return function (dispatch){
		return dispatch({
			type: GET_TOKEN,
			payload: token,
		});			
}}
export function getUser(curUser){			
	return function(dispatch){		
		return dispatch({
			type: GET_USER,
			payload: curUser,
		});			
}}

export function logOutAndReset(){			
	return function(dispatch){
		return dispatch({
			type: RESET,
		});			
}}
