import classes from './About.module.css';
import history_1 from 'src/assets/img/history-1.jpg';
import history_2 from 'src/assets/img/history-2.jpg';
import history_3 from 'src/assets/img/history-3.jpg';
import card from 'src/assets/img/card.png';
import cook_1 from 'src/assets/img/cook-1.jpg';
import cook_2 from 'src/assets/img/cook-2.jpg';
import cook_3 from 'src/assets/img/cook-3.jpg';

export { About };

function About() {

    return (
        <div className={`${classes.about_container}`}>
            <div className={`${classes.history}`}>

                <div className='container'>

                    <div className={`${classes.history_holder} col-lg-12 col-mx-6`}>
                        <div className={`${classes.history_info}`}>
                            <div className={`${classes.history_title}`}>
                                Немного <span>о&nbsp;нас</span>
                            </div>

                            <div className={`${classes.history_desc}`}>
                                Стоит сказать, что мы начинали с обычного кафе, с парой тройкой столиков, наша команда состояла из минимума персонала и у нас было простое, не чем не примечательное меню, но даже тогда, а было это около 10 лет назад, у нас в приоритете было качество и клиентоориентированость. Со временем, мы расширились, наше меню стало более разнообразным и интересным, а среди персонала исключительно профессионалы и любители своего дела, которые всегда рады встретить, обслужить и накормить каждого потенциального клиента. 
                            </div>
                        </div>

                        <div className={`${classes.history_images} col-mx-6`}>
                            <img className={`${classes.images_1}`} src={history_1}></img>
                            <img className={`${classes.images_2}`} src={history_2}></img>
                            <img className={`${classes.images_3}`} src={history_3}></img>
                        </div>
                    </div>

                </div>

            </div>

            <div className={`${classes.cards} pb-5`}>

                <div className='container'>

                    <div className={`${classes.cards_holder} row d-flex align-items-stretch`}>

                        <div className="p-3 col-md-12 col-xl-4">
                            <div className={`${classes.card}`}>

                                <div className={`${classes.card_image}`}>
                                    <img className={`${classes.card_img}`} src={card}></img>
                                </div>

                                <div className={`${classes.card_title}`}>
                                    Волшебная&nbsp;<span> Атмосфера</span>
                                </div>

                                <div className={`${classes.card_desc}`}>
                                    Только в нашем заведении вы сможете насладиться уютом и комфортом и почувствуете себя "как дома"
                                </div>

                            </div>
                        </div>

                        <div className="p-3 col-md-12 col-xl-4">
                            <div className={`${classes.card}`}>

                                <div className={`${classes.card_image}`}>
                                    <img className={`${classes.card_img}`} src={card}></img>
                                </div>

                                <div className={`${classes.card_title}`}>
                                    Гастрономический&nbsp;<span>Рай</span>
                                </div>

                                <div className={`${classes.card_desc}`}>
                                    Любое наше блюдо не только насытит вас, но и принесет вам удовольствие, после которого вы заходите приходить к нам снова и снова!

                                </div>

                            </div>
                        </div>

                        <div className="p-3 col-md-12 col-xl-4">
                            <div className={`${classes.card}`}>

                                <div className={`${classes.card_image}`}>
                                    <img className={`${classes.card_img}`} src={card}></img>
                                </div>

                                <div className={`${classes.card_title}`}>
                                    Демократичные&nbsp;<span>Цены</span>
                                </div>

                                <div className={`${classes.card_desc}`}>
                                    Вас приятно удивидит соотношение цены и качества, у нас есть предложения для любого кошелька, а также приятные бонусы и акции
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={`${classes.black_block}`}>

                <div className='container'>

                    <div className={`${classes.block_holder}`}>
                        <div className={`${classes.left}`}>
                            <div className={`${classes.left_title}`}>
                                Отпразднуйте в одном из <br/> самых лучших заведений города.
                            </div>

                            <div className={`${classes.left_text}`}>
                                Только в этом месяце бизнес-ланч от 200 ₽
                            </div>
                        </div>

                        <div className={`${classes.right}`}>
                            <div className={`${classes.right_button}`}>
                                <a href='#contacts' className={`${classes.right_btn}`}>ЗАКАЗ СТОЛИКА</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className={`${classes.cook}`}>

                <div className='container'>

                    <div className={`${classes.cook_title}`}>
                        Наши <span>Повара</span>
                    </div>


                    <div className={`${classes.cook_content}`}>
                        <img src={cook_1}></img>
                        <img src={cook_2}></img>
                        <img src={cook_3}></img>
                    </div>

                </div>

            </div>

            <div className="location">
                <a name='contacts'></a>
                
                <div className="container">
                    <hr className='pb-4' />

                    <h2 className='pb-4'>Связаться с нами:</h2>
                    <div className="row d-flex pb-4">
                        <div className="col-4">
                            <h5>Наш адрес:</h5>
                        </div>
                        <div className="col-8">
                            Революционная ул., 61Д, Бугуруслан
                        </div>
                    </div>
                    <div className="row d-flex pb-4">
                        <div className="col-4">
                            <h5>Служба бронирования:</h5>
                        </div>
                        <div className="col-8">
                            +7 (3535) 22-28-26
                        </div>
                    </div>

                    <h5 className='pb-4'>Мы на карте:</h5>

                    <div className={`${classes.map_wrapper}`}>
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeca4391e563e4aafab93e22baccdb0f70fff91a56651eed4f03c2c20085cf8e1&amp;source=constructor" width="100%" height="380"></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
}