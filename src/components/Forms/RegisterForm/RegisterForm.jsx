import classes from '../Forms.module.css';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from 'src/helpers';
import { authActions } from 'src/store';

export { RegisterForm };

function RegisterForm() {

    const dispatch = useDispatch();
    const email = useSelector(x => x.auth.afterRegUser?.email);
    const password = useSelector(x => x.auth.afterRegUser?.password);
    const authError = useSelector(x => x.auth.error);

    const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    useEffect(() => {
        if (email) dispatch(authActions.authenticate({ email, password}))
    }, [email]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Электронная почта - это обязательное поле').email('Необходимо предоставить реальный адрес электронной почты'),
        password: Yup.string().required('Пароль - это обязательное поле').min(8, 'Пароль слишком короткий').matches(/[a-zA-Z0-9_]/, 'Пароль должен состоять из латинских букв и цифр'),
        phone_number: Yup.string().required('Номер телефона - это обязательное поле').matches(phoneRegExp, 'Номер телефона записан неправильно')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, phone_number, password }) {

        let username = email.substring(0, email.indexOf("@"));

        dispatch(authActions.savePassword(password))

        return dispatch(authActions.createUser({ username, email, phone_number, password }));
    }

    return (
        <form className={`form px-3 d-flex flex-column align-items-stretch justify-content-between ${classes.form_panel}`} onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <input type="text" name="email" {...register('email')} className={`form-control ${classes.form_control} ${classes.slim} ${errors.email ? 'is-invalid' : ''}`} placeholder="Почта"></input>
                <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
                <input type="text" name="phone_number" {...register('phone_number')} className={`form-control ${classes.form_control} ${classes.slim} ${errors.phone_number ? 'is-invalid' : ''}`} placeholder="Номер телефона"></input>
                <div className="invalid-feedback">{errors.phone_number?.message}</div>
            </div>

            <div className="form-group">
                <input type="text" name="password" {...register('password')} className={`form-control ${classes.form_control} ${classes.slim} ${errors.password ? 'is-invalid' : ''}`} placeholder="Пароль"></input>
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                <button disabled={isSubmitting} className={`btn ${classes.form_control} ${classes.form_button}`}>
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Зарегистрироваться
                </button>

                {authError &&
                    <div className="alert alert-danger mt-3 mb-0 w-100">{authError.message}</div>
                }
            </div>

        </form>
    );
}