import { LoginForm } from 'src/components';
import classes from './RegisterForm.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export { RegisterForm };

function RegisterForm() {

    return (
        <div className={`container px-0 ${classes.form_container} h-100 py-5`}>

            <div className={`card card-registration card-registration-2 d-flex justify-content-center align-items-center ${classes.form_wrapper}`}>

                <div className={`card-body p-5 d-flex justify-content-between align-items-stretch flex-column ${classes.card_body}`}>

                    <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                        <h2 className="fw-bold mb-0 text-black text-center w-100">Авторизация</h2>
                    </div>

                    <Tabs>
                        <TabList className={`nav nav-pills mb-3 ${classes.tabs_container}`}>
                            <Tab className={`${classes.tab}`}>
                                <button className={`btn ${classes.form_control}`}>Вход</button>
                            </Tab>
                            <Tab className={`${classes.tab}`}>
                                <button className={`btn ${classes.form_control} `}>Регистрация</button>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <LoginForm></LoginForm>
                        </TabPanel>
                        <TabPanel>
                            <div className={`form px-3 d-flex flex-column align-items-stretch justify-content-between ${classes.form_panel}`}>

                                <input type="text" name="" className={`form-control ${classes.form_control} ${classes.slim}`} placeholder="Почта"></input>

                                <input type="text" name="" className={`form-control ${classes.form_control} ${classes.slim}`} placeholder="Номер телефона"></input>

                                <input type="text" name="" className={`form-control ${classes.form_control} ${classes.slim}`} placeholder="Пароль"></input>

                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className={`btn ${classes.form_control} ${classes.form_button}`}>Зарегистрироваться</button>
                                </div>

                            </div>
                        </TabPanel>
                    </Tabs>

                </div>

            </div>

        </div>
    );
}