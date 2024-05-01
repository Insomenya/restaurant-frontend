import classes from './PopularMeals.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { MenuMeal } from 'src/components';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from 'src/store';

export { PopularMeals };

function PopularMeals() {
    const dispatch = useDispatch();
    const popular = useSelector(x => x.menu.popular);

    useEffect(() => {
        dispatch(menuActions.getPopular());
    }, []);

    const listItems = () => {
        if (popular?.length) {
            return (
                popular.map((meal) => (
                    <SwiperSlide key={`popular-${meal.id}`}>
                        <MenuMeal meal={meal} isGrid={false}></MenuMeal>
                    </SwiperSlide>
                ))
            )
        }
    }

    if (popular?.length) {
        return (
            <div className={`pb-4 mt-4 mb-4 ${classes.popular_container}`}>
                <h2 className={`mb-4 ${classes.popular_header}`}>Популярные блюда</h2>
                <Swiper
                    modules={[Navigation]}
                    className={`${classes.popular_slider}`}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 40
                        },
                    }}
                >
                    {listItems()}
                </Swiper>
            </div>
        );
    } else {
        return null;
    }
}