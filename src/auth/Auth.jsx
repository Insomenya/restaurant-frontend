import classes from './Auth.module.css';
import { LoginForm, RegisterForm } from 'src/components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export { Auth };

function Auth() {

    const usernameSet = useSelector(x => x.auth.user?.username);

    useEffect(() => {
        if (usernameSet) history.navigate('/');
    }, []);

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
                            <RegisterForm></RegisterForm>
                        </TabPanel>
                    </Tabs>

                </div>

            </div>

        </div>
    )
}