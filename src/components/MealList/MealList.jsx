import { MealCategory } from 'src/components';
import classes from './MealList.module.css';
import { useSelector } from 'react-redux';

export { MealList };

function MealList() {

    const { menu } = useSelector(x => x.menu);
    const mbc = menu.mealsByCategory;

    return (
        <>
            {mbc?.length &&
                mbc.map((cat) => (
                    <div className='pb-4 mt-4' key={`meal-cat-${cat.category_id}`}>
                        <a name={`cat-${cat.category_id}`}></a>
                        <h2 className={`mb-4 ${classes.category_header}`}>{cat.category}</h2>
                        <MealCategory category={cat}></MealCategory>
                    </div>
                ))
            }
        </>
    );
}