import { useSelector } from 'react-redux';
import classes from './Cart.module.css';
import { useCart } from 'react-use-cart';
import { CiTrash, CiTurnL1 } from 'react-icons/ci';
import { OrderSummary } from 'src/components';
import { NavLink } from 'react-router-dom';

export { Cart };

function Cart() {
    const { user: authUser } = useSelector(x => x.auth);
    const { totalUniqueItems, cartTotal, emptyCart, isEmpty } = useCart();

    return (
        <section className={`h-100 h-custom ${classes.cart_container}`}>
            <div className="container py-5 px-0 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className={`card card-registration card-registration-2 ${classes.cart_card_wrapper}`}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                                                <h2 className="fw-bold mb-0 text-black">Корзина</h2>
                                                <h6 className="mb-0 text-muted">{totalUniqueItems} позиций</h6>
                                            </div>
                                            <hr className="my-4"></hr>

                                            <OrderSummary addControls={true}></OrderSummary>

                                            <div className="pt-3 d-flex flex-wrap">
                                                <h6 className="mb-0 py-3 px-3">
                                                    <NavLink to="/" className={`text-body ${classes.cart_link}`}><CiTurnL1></CiTurnL1> Обратно к меню</NavLink>
                                                </h6>

                                                <h6 className="mb-0 py-3 px-3">
                                                    <a className={` text-danger ${classes.cart_link}`} onClick={() => { emptyCart() }}><CiTrash></CiTrash> Очистить корзину</a>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`col-lg-4 ${classes.cart_summary}`}>
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Всего</h3>
                                            <hr className="my-4"></hr>

                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Полная стоимость</h5>
                                                <h5 className={`${classes.cart_total_price}`}>{cartTotal}<span className={`${classes.rub}`}>р</span></h5>
                                            </div>

                                            <button type="button" data-mdb-button-init data-mdb-ripple-init className={`btn btn-block btn-lg ${isEmpty ? 'disabled' : ''} ${classes.cart_order_button}`} data-mdb-ripple-color="dark">Заказать</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}