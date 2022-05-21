import axios from 'axios';
export const GET_SNEAKERS = 'GET_SNEAKERS',
<<<<<<< HEAD
  SEARCH_BY_NAME = 'SEARCH_BY_NAME',
  FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY',
  FILTER_BY_BRAND = 'FILTER_BY_BRAND',
  GET_DETAIL = 'GET_DETAIL',
  SET_CART = 'SET_CART',
  CLEAN_DETAIL = 'CLEAN_DETAIL',
  SORT_PRICE = 'SORT_PRICE',
  REMOVE_ITEM_CART = 'REMOVE_ITEM_CART',
  SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
=======
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
	DELETE_CATEGORY = "DELETE_CATEGORY";


>>>>>>> 415a5bb245f7e5d0932ece06e1ce7188cef12d9b

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

export const getTotalPrice = () => {
<<<<<<< HEAD
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
=======
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
//------------ADMIN----------------ADMIN------------ADMIN
export function getAllUsers() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`https://node-api-sneakers.herokuapp.com/getUser`)
			return dispatch({
				type: GET_ALL_USERS,
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}
}

//deleteUsers

export function deleteUser(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.delete(`https://node-api-sneakers.herokuapp.com/deleteUser/${id}`)
			return dispatch({
				type: DELETE_USER,
				payload: data
			})
		} catch (error) {
			console.log(error)
		}
	}
}

//createModel

export function createSneaker(payload) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(`https://node-api-sneakers.herokuapp.com/createModel`, payload)
			return dispatch({
				type: CREATE_MODEL,
				payload: data
			})
		} catch (error) {
			console.log(error)
		}
	}
}

//getCategories

export function getCategories() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`https://node-api-sneakers.herokuapp.com/categories`)
			return dispatch({
				type: GET_CATEGORIES,
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}
}

//create category para el form de create model

export function createCategory(payload) {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(`https://node-api-sneakers.herokuapp.com/createCate`, payload)
			return dispatch({
				type: CREATE_CATEGORY,
				payload: data
			})
		} catch (error) {
			console.log(error)
		}
	}
}

//delete category

export function deleteCategory(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.delete(`https://node-api-sneakers.herokuapp.com/deleteCat/${id}`)
			return dispatch({
				type: DELETE_CATEGORY,
				payload: data
			})
		} catch (error) {
			console.log(error)
		}
	}
}


//getModels

export function getModels() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`https://node-api-sneakers.herokuapp.com/getModels`)
			return dispatch({
				type: GET_CATEGORIES,
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}
}
>>>>>>> 415a5bb245f7e5d0932ece06e1ce7188cef12d9b
