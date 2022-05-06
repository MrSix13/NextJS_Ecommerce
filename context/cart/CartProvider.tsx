import {FC, useReducer,useEffect} from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?:ShippingAddress;
}

export interface ShippingAddress{
    firstName: string;
    lastName: string;
    address: string;
    zip: string;
    city: string;
    country: string;
     phone: string;

}
const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal:0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface six{
    children?:React.ReactNode
}


export const CartProvider:FC<six> = ( {children}) =>{
    
    const [state,dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(()=>{
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({type:'[Cart] - LoadCart from cookies | storage ', payload: cookieProducts});
        } catch (error) {
            dispatch({type:'[Cart] - LoadCart from cookies | storage ', payload: []});
        }
    },[])

    useEffect(()=>{
        if(Cookie.get('firstName')){
            const shippingAddres = {
                firstName : Cookies.get('firstname')  || '',
                lastName : Cookies.get('lastName') || '',
                address : Cookies.get('address') || '',
                zip : Cookies.get('zip') || '',
                city : Cookies.get('city') || '',
                country : Cookies.get('country') || '',
                phone: Cookies.get('phone') || '',
             }

             dispatch({type:'[Cart] - LoadAddress from Cookies', payload: shippingAddres})
        }
    })
    
    useEffect(()=>{
        Cookies.set('cart', JSON.stringify(state.cart))
    },[state.cart])


    useEffect(()=>{
        const numberOfItems = state.cart.reduce((prev,current)=>current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev,current)=>(current.price * current.quantity) + prev, 0);

        //Impuestos
        const taxRate = 0.15;

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }
        dispatch({type:'[Cart] - Update order summary', payload: orderSummary});
    },[state.cart])
    
    const addProductToCart = (product:ICartProduct ) =>{
        //Nivel1
        //dispatch({type:'[Cart] - Add Product', payload: product});

        const productInCart = state.cart.some(p=>p._id === product._id);
        if(!productInCart) return dispatch({type:'[Cart] - Update products in cart', payload:[...state.cart, product]})
    
        const productInCartButDifferentSize = state.cart.some(p=>p._id === product._id && p.size === product.size);
        if(!productInCartButDifferentSize) return dispatch({type:'[Cart] - Update products in cart', payload: [...state.cart, product]})
        
        //Acumular
        const updateProducts = state.cart.map(p=>{
            if(p._id !== product._id)return p;
            if(p.size !== product.size) return p;

            //Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({type:'[Cart] - Update products in cart', payload: updateProducts});
    }


    const updateCartQuantity = (product:ICartProduct) =>{
        dispatch({type:'[Cart] - Change cart quantity', payload: product})
    }
    
    const removeCartProduct = (product:ICartProduct) =>{
        dispatch({type:'[Cart] - Remove product in cart', payload: product})
    }

    const updateAddress = (address:ShippingAddress) =>{
        Cookies.set('firstname', address.firstName)
        Cookies.set('lastName', address.lastName)
        Cookies.set('address', address.address)
        Cookies.set('zip', address.zip)
        Cookies.set('city', address.city)
        Cookies.set('phone', address.phone)

        dispatch({type:'[Cart] - Update Adress', payload: address})
    }
    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress
        }}>
            {children}
        </CartContext.Provider>
    )
}