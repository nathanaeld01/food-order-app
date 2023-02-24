import { useContext, useEffect, useState } from "react";
import CartContext from './../../store/cart-context';
import CartIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
    const [buttonClick, setButtonClick] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    const buttonClasses = `${classes.button} ${buttonClick ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0)
            return;
        setButtonClick(true);

        const timer = setTimeout(() => { setButtonClick(false) }, 300);

        return () => clearTimeout(timer);
    }, [items]);

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default CartButton;