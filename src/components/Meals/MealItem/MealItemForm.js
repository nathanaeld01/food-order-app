import { useRef } from 'react';
import Input from './../../UI/Input';
import classes from "./MealItemForm.module.css";
import { useState } from 'react';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const inputAmtRef = useRef();

    const submitHandler = e => {
        e.preventDefault();
        const enteredAmt = inputAmtRef.current.value;
        const enteredAmtNumber = +enteredAmt;

        if(enteredAmt.trim().length === 0 || enteredAmtNumber < 1 || enteredAmtNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmtNumber);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={inputAmtRef} label="Amount" input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount</p>}
        </form>
    )
};

export default MealItemForm;