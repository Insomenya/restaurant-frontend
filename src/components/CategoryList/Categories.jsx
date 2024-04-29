import classes from './Categories.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules'
import { useSelector } from 'react-redux';

export { Categories };

function Categories() {

    const { menu } = useSelector(x => x.menu);
    const mbc = menu.mealsByCategory;

    return (
        <div className='pb-4 pt-4'>
            {mbc?.length &&
                <Swiper
                    modules={[Mousewheel]}
                    spaceBetween={15}
                    slidesPerView='auto'
                    mousewheel={true}
                >
                    {mbc.map((cat) => (
                        <SwiperSlide key={`cat-${cat.category_id}`} className={`${classes.slide}`}>
                            <a href={`#cat-${cat?.category_id}`} className={`${classes.category}`}>{cat.category}</a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    );
}