import {FC, useReducer} from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

interface six{
    children?:React.ReactNode
}


export const CartProvider:FC<six> = ( {children}) =>{
    
    const [state,dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    
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
    
    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}