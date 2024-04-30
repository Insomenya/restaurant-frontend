import { useSelector } from 'react-redux';
import { Categories, Menu } from 'src/components';

export { Home };

function Home() {
    const { user: authUser } = useSelector(x => x.auth);
    const { menu } = useSelector(x => x.menu);

    const mbc = menu.mealsByCategory;

    return (
        <div>
            {mbc?.length &&
                <>
                    <Categories></Categories>
                    <Menu></Menu>
                </>
            }
            {menu.loading && <div className="spinner-border spinner-border-sm"></div>}
            {menu.error && <div className="text-danger">Ошибка при загрузке меню: {menu.error.message}</div>}
        </div>
    );
}