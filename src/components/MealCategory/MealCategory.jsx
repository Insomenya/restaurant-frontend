import classes from './MealCategory.module.css';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MenuMeal } from 'src/components';
import React from 'react'

export { MealCategory };

function MealCategory({ category }) {
    const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
    const { items } = category;

    const listItems = () => {
        if (items?.length) {
            return (
                items.map((meal) => {
                    if (isMobile) {
                        return (
                            <SwiperSlide key={`cat-${category.category_id}-item-${meal.id}`}>
                                <MenuMeal meal={meal} isGrid={false}></MenuMeal>
                            </SwiperSlide>
                        )
                    } else {
                        return (
                            <React.Fragment key={`cat-${category.category_id}-item-${meal.id}`}>
                                <MenuMeal meal={meal} isGrid={true}></MenuMeal>
                            </React.Fragment>
                        );
                    }
                })
            )
        }
    }

    if (isMobile) {
        return (
            <Swiper 
                className={`${classes.category_slider}`}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    510: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                }}
            >
                {listItems()}
            </Swiper>
        );
    } else {
        return (
            <div className={`${classes.category_grid}`}>
                {listItems()}
            </div>
        );
    }
}