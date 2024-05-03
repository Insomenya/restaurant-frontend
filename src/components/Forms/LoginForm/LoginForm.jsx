import classes from '../Forms.module.css';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from 'src/helpers';
import { authActions } from 'src/store';

export { LoginForm };

function LoginForm() {

    const dispatch = useDispatch();
    const authToken = useSelector(x => x.auth.user?.token);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        if (authToken) dispatch(authActions.getUserData())
    }, [authToken]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Необходимо предоставить реальный адрес электронной почты').required('Электронная почта - это обязательное поле'),
        password: Yup.string().required('Пароль - это обязательное поле')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, password }) {
        return dispatch(authActions.authenticate({ email, password }));
    }

    return (
        <form className={`form px-3 d-flex flex-column align-items-stretch justify-content-between ${classes.form_panel}`} onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <input type="text" name='email' {...register('email')} className={`form-control ${classes.form_control} ${classes.slim} ${errors.email ? 'is-invalid' : ''}`} placeholder="Почта"></input>
                <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
                <input type="password" name="password" {...register('password')} className={`form-control ${classes.form_control} ${classes.slim} ${errors.password ? 'is-invalid' : ''}`} placeholder="Пароль"></input>
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                <button disabled={isSubmitting} className={`btn ${classes.form_control} ${classes.form_button}`}>
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Войти
                </button>

                {authError &&
                    <div className="alert alert-danger w-100 mt-3 mb-0">{authError.message}</div>
                }
            </div>

        </form>
    );
}