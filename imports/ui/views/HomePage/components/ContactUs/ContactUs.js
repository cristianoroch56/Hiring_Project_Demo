import React, { useState, useEffect, useRef } from 'react'
import validate from 'validate.js'
import { FormHelperText } from '@material-ui/core';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Slide from '@material-ui/core/Slide';

const createMessage = gql`
  mutation createMessage($message: MessageInput) {
    createMessage (message: $message) {
      _id
    }
  }
`;

const schema = {
    firstName: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    lastName: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true
    },
    phone: {
        presence: { allowEmpty: false, message: 'is required' },
        format: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    },
    city: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    province: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    postalCode: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    country: {
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

const ContactUs = ({ createMessage, createMessageResult }) => {
    const initialState = {
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    };

    const [formState, setFormState] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const titleRef = useRef()
    const cardsRef = useRef()
    const formRef = useRef()
    const isTitleVisible = useOnScreen(titleRef)
    const isCardVisible = useOnScreen(cardsRef)
    const isFormVisible = useOnScreen(formRef)
    const [titleMounted, setTitleMounted] = useState(false)
    const [cardMounted, setCardMounted] = useState(false)
    const [formMounted, setFormMounted] = useState(false)

    useEffect(() => {
        if (!titleMounted) {
            setTitleMounted(isTitleVisible);
        }
        if (!cardMounted) {
            setCardMounted(isCardVisible);
        }
        if (!formMounted) {
            setFormMounted(isFormVisible);
        }
    }, [isTitleVisible, isCardVisible, isFormVisible])

    useEffect(() => {
        const errors = validate(formState.values, schema)

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }))
    }, [formState.values])

    useEffect(() => {
        console.log(createMessageResult)
        if (!createMessageResult.loading) {
            setFormState(initialState);
        }
    }, [createMessageResult, createMessageResult.loading, createMessageResult.called])

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
        event.preventDefault()
        setLoading(true);
        const message = await createMessage({
            variables: {
                message: formState.values
            }
        });
        setLoading(false);
        setFormState(initialState);
        // console.log(message);
    }

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div ref={titleRef}></div>
                <Slide
                    direction="down"
                    timeout={{
                        appear: 700,
                        enter: 300,
                        exit: 500,
                    }}
                    in={titleMounted} mountOnEnter unmountOnExit>
                    <div className="section-title">
                        <span>NOUS CONTACTER</span>
                        <h2>NOUS CONTACTER</h2>
                    </div>
                </Slide>


                <div ref={cardsRef}></div>
                <Slide
                    direction="down"
                    timeout={{
                        appear: 1400,
                        enter: 900,
                        exit: 500,
                    }}
                    in={cardMounted} mountOnEnter unmountOnExit>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-12" data-aos="fade-up" data-aos-delay="100">
                            <div className="info-box">
                                <i className="bx bx-map"></i>
                                <h3>Notre adresse</h3>
                                <p>A108 Adam Street, New York, NY 535022</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="200">
                            <div className="info-box">
                                <i className="bx bx-envelope"></i>
                                <h3>Envoyez-nous un email</h3>
                                <p>info@example.com<br />contact@example.com</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="300">
                            <div className="info-box">
                                <i className="bx bx-phone-call"></i>
                                <h3>Appelez-nous</h3>
                                <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                            </div>
                        </div>
                    </div>
                </Slide>

                <div ref={formRef} style={{ marginTop: formMounted ? 0 : 100 }}></div>
                <Slide
                    direction="up"
                    timeout={{
                        appear: 2100,
                        enter: 1500,
                        exit: 500,
                    }}
                    in={formMounted} mountOnEnter unmountOnExit>
                    <form className="php-email-form mt-4" data-aos="fade-up" data-aos-delay="400" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="Prénom"
                                    onChange={handleChange}
                                    value={formState.values.firstName || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('firstName')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.firstName[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Nom"
                                    onChange={handleChange}
                                    value={formState.values.lastName || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('lastName')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.lastName[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Courriel"
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
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Téléphone"
                                    onChange={handleChange}
                                    value={formState.values.phone || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('phone')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.phone[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Ville"
                                    onChange={handleChange}
                                    value={formState.values.city || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('city')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.city[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="text"
                                    name="province"
                                    className="form-control"
                                    placeholder="Province"
                                    onChange={handleChange}
                                    value={formState.values.province || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('province')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.province[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="text"
                                    name="postalCode"
                                    className="form-control"
                                    placeholder="Code Postal"
                                    onChange={handleChange}
                                    value={formState.values.postalCode || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('postalCode')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.postalCode[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                <input
                                    type="text"
                                    name="country"
                                    className="form-control"
                                    placeholder="Pays"
                                    onChange={handleChange}
                                    value={formState.values.country || ''}
                                    disabled={loading}
                                />
                                {
                                    hasError('country')
                                        ? (
                                            <FormHelperText id="standard-weight-helper-text">
                                                {formState.errors.country[0]}
                                            </FormHelperText>
                                        ) : null
                                }
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <textarea
                                    className="form-control"
                                    name="comment1"
                                    rows="5"
                                    placeholder="Commentaires 1"
                                    value={formState.values.comment1 || ""}
                                    onChange={handleChange}
                                    disabled={loading}
                                ></textarea>
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <textarea
                                    className="form-control"
                                    name="comment2"
                                    rows="5"
                                    placeholder="Commentaires 2"
                                    value={formState.values.comment2 || ""}
                                    onChange={handleChange}
                                    disabled={loading}
                                ></textarea>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={!formState.isValid || createMessageResult.loading}>Envoyer le message</button>
                        </div>
                    </form>
                </Slide>
            </div>
        </section >
    )
}

export default graphql(createMessage, {
    name: 'createMessage'
})(ContactUs)
