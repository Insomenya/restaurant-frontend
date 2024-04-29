import classes from './Hero.module.css';

export { Hero };

function Hero() {

    return (
        <div className={`${classes.hero_section} d-flex ite align-items-center`}>
            <div className='d-flex flex-column align-items-center'>
                <div className={`${classes.header_title}`}>
                    <span>Добро пожаловать в</span>
                    <span>кафе SV</span>
                </div>
                <div className={`${classes.header_subtitle}`}>
                    лучшее кафе в городе
                </div>
            </div>
        </div>
    );
}