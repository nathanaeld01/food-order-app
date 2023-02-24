import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
    items: [],
    totalAmt: 0
}

const cartReducer = (state, action) => {
    if(action.type === "ADD_ITEM") {
        let updatedTotal;

        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        
        if(existingItem) {
            let incBy;
            if(action.mode === "ADD") {
                updatedTotal = state.totalAmt + (action.item.price * action.item.amount);
                incBy = action.item.amount;
            } else if(action.mode === "INC") {
                updatedTotal = state.totalAmt + action.item.price;
                incBy = 1;
            }
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + incBy
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedTotal = state.totalAmt + (action.item.price * action.item.amount);
            updatedItems = state.items.concat(action.item);
        }

        return { items: updatedItems, totalAmt: updatedTotal };
    }

    if(action.type === "REM_ITEM") {
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmt - existingItem.price;

        let updatedItems;
        if(existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return { items: updatedItems, totalAmt: updatedTotalAmount };
    }

    if(action.type === "CLEAR")
        return defaultCart;

    return defaultCart;
}

const CartProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);

    const addItemHandler = (item, mode) => {
        dispatchCart({type: "ADD_ITEM", mode: mode, item: item});
    };

    const removeItemHandler = (id) => {
        dispatchCart({type: "REM_ITEM", id: id});
    };

    const clearCartHandler = () => {
        dispatchCart({ type: "CLEAR" });
    }

    const cartContext = {
        items: cartState.items,
        totalAmt: cartState.totalAmt,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;