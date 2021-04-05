import React, { useState, useEffect, useRef } from 'react'
import validate from 'validate.js'
import { FormHelperText } from '@material-ui/core';
import { Accounts } from "meteor/accounts-base";
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

const Register = ({ switchToLogin }) => {
    const initialState = {
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    };

    const ref = useRef()
    const isVisible = useOnScreen(ref)

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
        Accounts.createUser(
            {
                email: formState.values.email,
                password: formState.values.password
            },
            error => {
                console.log(error);
                setLoading(false);
                if (!error) {
                    Meteor.userId() && Meteor.logout();
                    setFormState(initialState);
                    switchToLogin()
                } else {
                    alert(error.reason || "There is a problem with registration")
                }
            }
        );
    }

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false

    return (
        <section id="contact" className="contact">
            <div ref={ref} style={{ marginTop: mounted ? 0 : 100 }}></div>
            <Slide
                direction="down"
                timeout={{
                    appear: 900,
                    enter: 700,
                    exit: 500,
                }}
                in={mounted} mountOnEnter unmountOnExit>
                <div className="container register" data-aos="fade-down">
                    <div className="row">
                        <div className="col-md-3 register-left">
                            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                            <h3>S'inscrire</h3>
                            <p>Inscrivez-vous pour commencer!</p>
                            <input type="submit" value="Connexion" onClick={switchToLogin} />
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
                                            <input type="submit" className="btnRegister" value="S'inscrire" disabled={loading || !formState.isValid} onClick={handleSubmit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </section>
    )
}

export default Register
