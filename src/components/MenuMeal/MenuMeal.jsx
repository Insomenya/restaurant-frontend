import { useCart } from 'react-use-cart';
import classes from './MenuMeal.module.css';
import { useSelector } from 'react-redux';

export { MenuMeal };

function MenuMeal({ meal, isGrid }) {
    const authUser = useSelector(x => x.auth.user);
    const { inCart, getItem, updateItemQuantity, addItem } = useCart();

    const mealToAdd = {
        id: meal.id,
        name: meal.name,
        img: meal.img,
        price: meal.price,
        category: meal.category_name,
    }

    const addToCart = () => {
        addItem(mealToAdd);
    }

    const addMore = (mealInCart) => {
        updateItemQuantity(mealInCart.id, mealInCart.quantity + 1);
    }

    const removeSome = (mealInCart) => {
        updateItemQuantity(mealInCart.id, mealInCart.quantity - 1);
    }

    const showButton = () => {
        if (inCart(meal.id)) {
            let mealInCart = getItem(meal.id);

            return (
                <div className={`btn ${classes.cart_control}`}>
                    <div className={`btn ${classes.cart_minus}`} onClick={() => { removeSome(mealInCart) }}>-</div>
                    <div className={`${classes.cart_quantity}`}>{mealInCart.quantity}</div>
                    <div className={`btn ${classes.cart_plus}`} onClick={() => { addMore(mealInCart) }}>+</div>
                </div>
            );
        } else {
            return (
                <button className={`btn ${classes.meal_add}`} onClick={() => { addToCart() }}>+</button>
            );
        }
    }

    return (
        <div className={`${classes.meal_container} ${isGrid ? classes.grid : ''}`}>
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
                    {authUser ? showButton() : ''}
                </div>
            </div>
        </div>
    );
}