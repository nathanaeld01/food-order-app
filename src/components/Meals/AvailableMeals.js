import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://react-http-346ce-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");
            const respData = await response.json();

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const loadedMeals = [];
            for(const key in respData) {
                loadedMeals.push({
                    id: key,
                    name: respData[key].name,
                    description: respData[key].description,
                    price: respData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if(isLoading) {
        return (
            <section className={classes['meals-loading']}>
                <p>Loading...</p>
            </section>
        );
    }

    if(httpError) {
        return (
            <section className={classes['meals-error']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const renderMeals = meals.map(meal => (
        <MealItem id={meal.id} key={meal.id} name={meal.name} desc={meal.description} price={meal.price} />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{renderMeals}</ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;