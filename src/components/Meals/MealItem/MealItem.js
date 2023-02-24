import { useContext } from 'react';
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from './../../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amt => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amt,
            price: props.price
        }, "ADD");
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.desc}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;