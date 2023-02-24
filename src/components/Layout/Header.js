import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import CartButton from "./CartButton";

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <CartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Table of food" />
            </div>
        </>
    )
};

export default Header;