import { useSelector } from 'react-redux';
import classes from './OrderSummary.module.css';
import { useCart } from 'react-use-cart';
import React from 'react';

export { OrderSummary };

function OrderSummary({ addControls }) {
    const { user: authUser } = useSelector(x => x.auth);
    const { items, updateItemQuantity } = useCart();

    const addMore = (mealInCart) => {
        updateItemQuantity(mealInCart.id, mealInCart.quantity + 1);
    }

    const removeSome = (mealInCart) => {
        updateItemQuantity(mealInCart.id, mealInCart.quantity - 1);
    }

    const printOrderItem = (item) => {

        return (
            <React.Fragment key={`item-${item.id}`}>
                <div className={`row mb-4 d-flex justify-content-between align-items-center ${classes.list_item_container}`}>
                    <div className={`col-md-2 col-lg-2 col-xl-2 ${classes.list_item_image}`}>
                        <img src={`${import.meta.env.VITE_REACT_APP_API_URL}${item.img}`} className="img-fluid rounded-3" alt={item.name}></img>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                        <h6 className="text-muted">{item.name}</h6>
                        <h6 className="text-black mb-0">{item.category}</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <div className={`${classes.quantity_container}`}>
                            {addControls ? (
                                <div className={`btn ${classes.quantity_plus}`} onClick={() => { addMore(item) }}>+</div>
                            ) : ''}

                            <div className={`${classes.quantity_detail}`}>{item.quantity}&nbsp;x&nbsp;{item.price}<span className={`${classes.rub}`}>р</span></div>

                            {addControls ? (
                                <div className={`btn ${classes.quantity_minus}`} onClick={() => { removeSome(item) }}>-</div>
                            ) : ''}
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 className={`mb-0 ${classes.list_item_price}`}>{item.price * item.quantity}<span className={`${classes.rub}`}>р</span></h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                    </div>
                </div>

                <hr className="my-4"></hr>
            </React.Fragment>
        );
    }

    return (
        <>
            {items.length ?
                items.map((item) => (
                    printOrderItem(item, addControls)
                )) :
                (
                    <h6 className={`py-5 my-5 ${classes.empty_list}`}>
                        Этот список пуст
                    </h6>
                )
            }
        </>
    );
}