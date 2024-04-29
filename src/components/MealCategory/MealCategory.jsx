import classes from './MealCategory.module.css';

export { MealCategory };

function MealCategory({ category }) {

    const { items } = category;

    const listItems = () => {
        if (items?.length) {
            return (
                items.map((meal) => (
                    <div className={`${classes.meal_container}`} key={`cat-${category.category_id}-item-${meal.id}`}>
                        <div className={`${classes.image_wrapper}`}>
                            <img src={`${import.meta.env.VITE_REACT_APP_API_URL}${meal.img}`} alt={meal.name} />
                        </div>
                        <div className={`${classes.meal_data}`}>
                            <div className={`${classes.meal_header}`}>
                                <h3 className={`${classes.meal_name}`}>{meal.name}</h3>
                                <div className={`${classes.meal_description}`}>{meal.description}</div>
                            </div>
                            <div className={`${classes.meal_footer}`}>
                                <div className={`${classes.meal_price}`}>{meal.price}<span className={`${classes.rub}`}>р</span></div>
                                <button className={`btn ${classes.meal_add}`}>+</button>
                            </div>
                        </div>
                    </div>
                ))
            )
        }
    }

    return (
        <div className={`${classes.category_grid}`}>
            {listItems()}
        </div>
    );
}