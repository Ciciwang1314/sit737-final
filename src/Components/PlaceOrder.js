import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

export default function PlaceOrder(props){

    const cart = useSelector(state => state.cart);

    const { cartItems, shipping, payment } = cart;
    if(!shipping.address){
        props.history.push("/shipping");
    }else if(!payment.paymentMethod){
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a, c) => a+c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ?0 : 10;
    const taxPrice = 0.15*itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const checkoutHandler = () =>{
        props.history.push("/login?redirect=shipping");
    }

    const placeOrderHandler = () => {
        // 
    }


    useEffect(() => {

    }, [])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="placeorder">
                <div className="placeoder-info">
                    <div>
                        <h3>shipping</h3>
                        <div>
                            {cart.shipping.address}, {cart.shipping.city}, 
                            {cart.shipping.postalCode}, {cart.shipping.country}, 
                        </div>
                    </div>
                    <div>
                        <h3>Pyament</h3>
                        <div>
                            Payment Method: {cart.payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>
                                    Shopping Cart
                                </h3>
                                <div className="price"> 
                                    <b>Price</b>
                                </div>
                            </li>
                            {
                                cartItems.length === 0 ?
                                <div>
                                    Cart is empty
                                </div>
                                :
                                cartItems.map( item => 
                                    <li key={item.name}>
                                            <div className="cart-image">
                                                <img src={item.image} alt="product" />
                                            </div>
                                            <div className="cart-name">
                                                <div>
                                                    <Link to={"/products/" + item.product}>
                                                        <b>{item.name}</b>
                                                    </Link>
                                                </div>
                                                <div>
                                                    Quantity: {item.qty}
                                                </div>
                                            </div>
                                            <div className="cart-price">
                                                ${item.price.toFixed(2)}
                                            </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button className="button btn-bg full-width" onClick={placeOrderHandler}>Place Order</button>
                        </li>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Itmes</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice}</div>
                        </li>                    
                    </ul>
                </div>
            </div>
        </div>
    );
} 