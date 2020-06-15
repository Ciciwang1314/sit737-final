import { ADD_TO_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../Constants/CartConstant";
import Axios from 'axios';
import Cookie from "js-cookie";

const addToCart = (productId, qty) => async (dispatch, getState) =>{
    try{
        const {data} = await Axios.get("http://localhost:5000/products/" + productId);
        dispatch({
            type: ADD_TO_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }   
        });
        const {cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }catch (error){

    }
}

const RemoveFromCart = (productId) => (dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping =(data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload:data});
}

const savePayment =(data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload:data});
}

export { addToCart, RemoveFromCart, saveShipping, savePayment }