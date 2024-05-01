import { useSelector } from 'react-redux';
import { Categories, Menu } from 'src/components';

export { History };

function History() {
    const { user: authUser } = useSelector(x => x.auth);
    const { orders } = useSelector(x => x.orders);

    return (
        <div>
            {orders && <h2>Список заказов</h2>}
            {orders.loading && <div className="spinner-border spinner-border-sm"></div>}
            {orders.error && <div className="text-danger">Ошибка при загрузке списка заказов: {orders.error.message}</div>}
        </div>
    );
}