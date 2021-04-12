import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import validate from 'validate.js'
import { FormHelperText } from '@material-ui/core';
import { withApollo } from 'react-apollo';
import { useDispatch } from 'react-redux';
import { SigninSuccess, UserLoggedIn } from '../../../../actions';
import Slide from '@material-ui/core/Slide';

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
    },
}

// special hook
function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return isIntersecting
}

const Login = ({ switchToRegister }) => {
    const initialState = {
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    };

    const history = useHistory()

    const ref = useRef()
    const isVisible = useOnScreen(ref)

    const dispatch = useDispatch()

    const [formState, setFormState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (mounted) return;
        setMounted(isVisible);
    }, [isVisible])

    useEffect(() => {
        const errors = validate(formState.values, schema)

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }))
    }, [formState.values])

    const handleChange = (event) => {
        event.persist()

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        Meteor.loginWithPassword(formState.values.email, formState.values.password, error => {
            if (!error) {
                setFormState(initialState);
                dispatch(UserLoggedIn(Meteor.user()))
                dispatch(SigninSuccess())
                setLoading(false);
                history.push('/admin')
            } else {
                alert(error.reason || "There is a problem with login")
                setLoading(false);
            }
        });
    }

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false

    return (
        <section id="contact" className="contact">
            <div ref={ref} style={{ marginTop: mounted ? 0 : 100 }}></div>
            <Slide
                direction="down"
                timeout={{
                    appear: 500,
                    enter: 300,
                    exit: 500,
                }}
                in={mounted} mountOnEnter unmountOnExit>
                <div className="container register">
                    <form>
                        <div className="row">
                            <div className="col-md-3 register-left">
                                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                                <h3>Bienvenue</h3>
                                <p>Connectez-vous au tableau de bord et prenez le contrôle total!</p>
                                <input type="submit" value="S'inscrire" onClick={switchToRegister} />
                            </div>
                            <div className="col-md-9 register-right">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <h3 className="register-heading">Entrez vos identifiants</h3>
                                        <div className="row register-form">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="E-mail"
                                                        onChange={handleChange}
                                                        value={formState.values.email || ''}
                                                        disabled={loading}
                                                    />
                                                    {
                                                        hasError('email')
                                                            ? (
                                                                <FormHelperText id="standard-weight-helper-text">
                                                                    {formState.errors.email[0]}
                                                                </FormHelperText>
                                                            ) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Mot de passe"
                                                        onChange={handleChange}
                                                        value={formState.values.password || ''}
                                                        disabled={loading}
                                                    />
                                                    {
                                                        hasError('password')
                                                            ? (
                                                                <FormHelperText id="standard-weight-helper-text">
                                                                    {formState.errors.password[0]}
                                                                </FormHelperText>
                                                            ) : null
                                                    }
                                                </div>
                                                <input type="submit" className="btnRegister" value="Connexion" disabled={loading || !formState.isValid} onClick={handleSubmit} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Slide>
        </section>
    )
}

export default withApollo(Login);
