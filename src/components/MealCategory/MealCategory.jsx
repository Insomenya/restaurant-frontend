import classes from './MealCategory.module.css';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react'

export { MealCategory };

function MealCategory({ category }) {
    const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
    const { items } = category;

    const printItem = (meal) => {
        return (
            <div className={`${classes.meal_container}`}>
                <div className={`${classes.image_wrapper}`}>
                    <img src={`${import.meta.env.VITE_REACT_APP_API_URL}${meal.img}`} alt={meal.name} />
                </div>
                <div className={`${classes.meal_data}`}>
                    <div className={`${classes.meal_header}`}>
                        <h3 className={`${classes.meal_name}`}>{meal.name}</h3>
                        <div className={`${classes.meal_description}`}>{meal.description}</div>
                    </div>
                    <div className={`${classes.meal_footer}`}>
                        <div className={`${classes.meal_price}`}>{meal.price}<span className={`${classes.rub}`}>р</span></div>
                        <button className={`btn ${classes.meal_add}`}>+</button>
                    </div>
                </div>
            </div>
        );
    }

    const listItems = () => {
        if (items?.length) {
            return (
                items.map((meal) => {
                    if (isMobile) {
                        return (
                            <SwiperSlide key={`cat-${category.category_id}-item-${meal.id}`}>
                                {printItem(meal)}
                            </SwiperSlide>
                        )
                    } else {
                        return (
                            <React.Fragment key={`cat-${category.category_id}-item-${meal.id}`}>
                                {printItem(meal)}
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