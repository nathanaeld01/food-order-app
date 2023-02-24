import { useContext, useState } from 'react';
import CartContext from './../../store/cart-context';
import Modal from './../UI/Modal';
import CartItem from './CartItem';
import classes from "./Cart.module.css";
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmt.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem(item, "INC");
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch("https://react-http-346ce-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItem = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
            {hasItems && (
                <button className={classes.button} onClick={() => setIsCheckout(true)}>Order</button>
            )}
        </div>
    );

    const modalContent = (
        <>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </>
    )

    const isSubmittingModal = <p>Submitting order data</p>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && modalContent}
            {isSubmitting && isSubmittingModal}
            {!isSubmitting && didSubmit && <p>Successfully sent the order</p>}
        </Modal>
    );
};

export default Cart;