import React,{FC,useReducer} from 'react';
import { UiContext, uiReducer } from './';

export interface UiState{
    isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false
}

interface six{
    children?:React.ReactNode
}

export const UiProvider:FC<six> = ({children})=>{
    
    const [state,dispatch] = useReducer(uiReducer,Ui_INITIAL_STATE);

    const toggleSideMenu = ()=>{
        dispatch({type:'[UI] - ToggleMenu'})
    }

    
    return(
        <UiContext.Provider value={{
            ...state,

            //Methods
            toggleSideMenu
        }}>
            {children}
        </UiContext.Provider>
    )
};