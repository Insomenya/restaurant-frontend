import { useDispatch, useSelector } from 'react-redux';
import classes from './MealModal.module.css';
import { useCart } from 'react-use-cart';
import { NavLink } from 'react-router-dom';
import { menuActions } from 'src/store';

export { MealModal };

function MealModal() {
    const { user: authUser } = useSelector(x => x.auth);
    const { getItem, updateItemQuantity, inCart, addItem } = useCart();
    const modal = useSelector(x => x.menu.modal);
    const mealDetail = modal.data;
    const dispatch = useDispatch();
    const currentCartItem = mealDetail ? (inCart(mealDetail.id) ? getItem(mealDetail.id) : { quantity: 0 }) : { quantity: 0 };

    const handleChange = (newQuantity) => {
        if (inCart(mealDetail.id)) {
            updateItemQuantity(mealDetail.id, newQuantity);
        } else if (newQuantity > 0) {
            let mealToAdd = {
                id: mealDetail.id,
                name: mealDetail.name,
                img: mealDetail.img,
                price: mealDetail.price,
                category: mealDetail.category_name,
                quantity: newQuantity
            };

            addItem(mealToAdd);
        }
    }

    const closeModal = () => {
        dispatch(menuActions.closeModal());
    }

    const printMeal = () => {
        return (
            <>
                <div className="row">
                    <div className="col-6">
                        <div className={`bg-image hover-zoom ripple rounded ripple-surface ${classes.meal_image}`}>
                            <img src={`${import.meta.env.VITE_REACT_APP_API_URL}${mealDetail.img}`} className="w-100" />
                        </div>
                    </div>
                    <div className="col-6">
                        <h5>{mealDetail.name}</h5>
                        <div className="pt-2 pb-2 text-muted small">
                            <span className="text-primary"> • </span>
                            <span>{mealDetail.category_name}</span>
                            <span className="text-primary"> • </span>
                        </div>
                        <p className={`h-100 mb-4 mb-md-0 ${classes.meal_description}`}>{mealDetail.description}</p>
                    </div>
                </div >
                {authUser ?
                    (
                        <>
                            <hr className="my-4"></hr>
                            <div className={`row d-flex justify-content-end ${classes.meal_form}`}>
                                <div className="col-4">
                                    <div className="d-flex flex-row align-items-center mb-1">
                                        <h4 className="mb-1 me-1">{mealDetail.price}<span className={`${classes.rub}`}>р</span></h4>
                                    </div>
                                    <h6 className="text-success">В корзине:</h6>
                                    <div className="d-flex flex-column mt-4">
                                        <input className={`form-control ${classes.custom_input}`} type="number" min={0} max={100} step={1} value={currentCartItem.quantity} onChange={(e) => { handleChange(e.target.value) }} />
                                        <NavLink to="/cart" onClick={() => { closeModal() }} className={`btn btn-outline-primary btn-sm mt-2 ${classes.custom_button}`}>Перейти в корзину</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    :
                    null
                }
            </>
        );
    }

    if (modal.isModalVisible) {
        return (
            <div className="card shadow-0 border-0">
                <div className="card-body">
                    {modal.loading ?
                        (
                            <div className="spinner-border spinner-border-sm"></div>
                        )
                        :
                        (modal.error ?
                            (
                                <div className="text-danger">Ошибка при загрузке описания блюда: {menu.modal.error?.message}</div>
                            )
                            :
                            (
                                printMeal()
                            )
                        )
                    }
                </div>
            </div>
        );
    } else {
        return null;
    }
}