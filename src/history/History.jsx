import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OldOrders, OrderMealList } from 'src/components';
import { ordersActions } from 'src/store';
import classes from './History.module.css';
import { statusDict } from 'src/helpers/order-status';

export { History };

function History() {
    const { user: authUser } = useSelector(x => x.auth);
    const store = useSelector(x => x.orders);
    const dispatch = useDispatch();

    let lastOrder;
    let remainingOrders = [];

    useEffect(() => {
        dispatch(ordersActions.getOrders());
    }, []);

    if (store.orders?.length) {
        lastOrder = store.orders[0];
        
        for (let i = 1; i < store.orders.length; i++) {
            remainingOrders.push(store.orders[i]);
        }
    }

    return (
        <div className={`${classes.history}`}>
            <div className='py-4'>
                <h2 className='pb-2'>Список заказов</h2>
                {store.orders && (
                    <div className={`accordion ${classes.custom_accordion}`} id="accordionPanelsStayOpenExample">
                        
                        {lastOrder &&
                            (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                        <button className={`accordion-button ${classes.accordion_button}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            Последний заказ
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                        <div className="accordion-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <h5>Статус заказа</h5>
                                                    </div>
                                                    <div className="col-8">
                                                    { statusDict[lastOrder.status] }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <h5>Дата заказа</h5>
                                                    </div>
                                                    <div className="col-8">
                                                    {`${new Date(lastOrder.created_at).toLocaleDateString()} (${new Date(lastOrder.created_at).toLocaleTimeString() })`}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <h5>Дата последнего обновления</h5>
                                                    </div>
                                                    <div className="col-8">
                                                        {`${new Date(lastOrder.updated_at).toLocaleDateString()} (${new Date(lastOrder.updated_at).toLocaleTimeString()})`}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h5>Список блюд:</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                    <OrderMealList customItems={lastOrder.meals}></OrderMealList>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                <button className={`accordion-button collapsed ${classes.accordion_button}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                    Остальные заказы
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                <div className="accordion-body">
                                    <OldOrders orderlist={remainingOrders}></OldOrders>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {store.orders?.loading && <div className="spinner-border spinner-border-sm"></div>}
                {store.error && <div className="text-danger">Ошибка при загрузке списка заказов: {orders.error.message}</div>}
            </div>
        </div>
    );
}