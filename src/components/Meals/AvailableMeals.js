import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const[error,setError] = useState(null);

    const fetchMeals = async () => {
        setIsLoading(true);
        setError(null);
      try{
        const response = await fetch('https://food-order-app-a160e-default-rtdb.firebaseio.com/meals.json');
        if(!response.ok){
          throw new Error('Unable to fetch data');
        }
        const responseData = await response.json();
        const loadedMeals = [];
        for (let key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          })
        }
        setMeals(loadedMeals);
      }
      catch(error){
        setError(error.message);  
      }
      setIsLoading(false);
    }
    

    useEffect(()=>{
      fetchMeals();
    },[])
  
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && !error && <p>Meals are loading...</p>}
        { error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;