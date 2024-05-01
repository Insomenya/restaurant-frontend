import classes from './OrderMealList.module.css';
import React from 'react';

export { OrderMealList };

function OrderMealList({ customItems }) {

    const printOrderItem = (item) => {

        return (
            <React.Fragment key={`item-${item.id}`}>
                <hr className="my-4"></hr>

                <div className={`row mb-4 d-flex justify-content-between align-items-center ${classes.list_item_container}`}>
                    <div className={`col-md-2 col-lg-2 col-xl-2 ${classes.list_item_image}`}>
                        <img src={`${import.meta.env.VITE_REACT_APP_API_URL}${item.image}`} className="img-fluid rounded-3" alt={item.name}></img>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                        <h6 className="text-muted">{item.name}</h6>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 className={`mb-0 ${classes.list_item_price}`}>{item.price}<span className={`${classes.rub}`}>р</span></h6>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <>
            {customItems.length ?
                customItems.map((item) => (
                    printOrderItem(item)
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