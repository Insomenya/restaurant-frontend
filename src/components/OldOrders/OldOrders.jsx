import { statusDict } from 'src/helpers';
import React from 'react';

export { OldOrders };

function OldOrders({ orderlist }) {

    const printOrderItem = (item) => {

        return (
            <React.Fragment key={`order-${item.id}`}>
                <hr className="my-4"></hr>
                <div className="col-6">
                    {statusDict[item.status]}
                </div>
                <div className="col-6">
                    {`${new Date(item.created_at).toLocaleDateString()} (${new Date(item.created_at).toLocaleTimeString()})`}
                </div>
            </React.Fragment>
        );
    }

    return (
        <>
            {orderlist.length ?
                (
                    <div className={`row my-4 py-2`}>
                        <div className="col-6">
                            <h5>Статус заказа</h5>
                        </div>
                        <div className="col-6">
                            <h5>Дата заказа</h5>
                        </div>
                        {
                            orderlist.map((item) => (
                                printOrderItem(item)
                            ))
                        }
                    </div>
                )
                 :
                (
                    <h6 className={`py-5 my-5`}>
                        Этот список пуст
                    </h6>
                )
            }
        </>
    );
}