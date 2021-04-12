import React, { useState, useEffect, useRef } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Slide from '@material-ui/core/Slide';
import { AutoForm, AutoField, ErrorField, LongTextField, SubmitField } from 'uniforms-bootstrap4';
import { bridge } from './uniform-bridge';
import { useDispatch } from 'react-redux';
import { SubmittingForm } from '../../../../actions';

const createMessage = gql`
  mutation createMessage($message: MessageInput) {
    createMessage (message: $message) {
      _id
    }
  }
`;

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
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const uniformRef = useRef();

    // all of these for section transitions (animation)
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
        if (!createMessageResult.loading) {
            // setFormState(initialState);
        }
    }, [createMessageResult, createMessageResult.loading, createMessageResult.called])

    const handleSubmit = async (values) => {
        if (errors.length > 0) return;
        dispatch(SubmittingForm());
        setLoading(true);
        const message = await createMessage({
            variables: {
                message: values
            }
        });
        setLoading(false);
        uniformRef.current.reset();
    }

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
                    <div className="php-email-form mt-4">
                        <AutoForm
                            schema={bridge}
                            onSubmit={handleSubmit}
                            // validate="onChange"
                            ref={uniformRef}
                            onValidate={(models, errors) => {
                                setErrors(errors);
                            }}
                        >
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <AutoField
                                        name="firstName"
                                        label={false}
                                        placeholder="Prénom"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'firstName')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide your first name!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        name="lastName"
                                        label={false}
                                        placeholder="Nom"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'lastName')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide your last name!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        type="email"
                                        name="email"
                                        label={false}
                                        placeholder="Courriel"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'email')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide a valid email!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        name="phone"
                                        label={false}
                                        placeholder="Téléphone"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'phone')[0] && <span style={{ fontSize: "80%", color: "red" }}>Phone has to be in this format: (000) 000-0000!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        name="city"
                                        label={false}
                                        placeholder="Ville"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'city')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide your city!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        name="province"
                                        label={false}
                                        placeholder="Province"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'province')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide your province!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        name="postalCode"
                                        label={false}
                                        placeholder="Code Postal"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'postalCode')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide your postal code!</span>}
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <AutoField
                                        name="country"
                                        label={false}
                                        placeholder="Pays"
                                        disabled={loading}
                                    />
                                    {errors.filter(e => e.name === 'country')[0] && <span style={{ fontSize: "80%", color: "red" }}>You have to provide your country!</span>}
                                </div>
                                <div className="col-md-12 form-group mt-3">
                                    <LongTextField
                                        name="comment1"
                                        label={false}
                                        placeholder="Commentaires 1"
                                        disabled={loading}
                                        rows="5"
                                    />
                                </div>
                                <div className="col-md-12 form-group mt-3">
                                    <LongTextField
                                        name="comment2"
                                        label={false}
                                        placeholder="Commentaires 2"
                                        disabled={loading}
                                        rows="5"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <SubmitField
                                    value="Envoyer le message"
                                    disabled={loading || errors.length > 0}
                                />
                            </div>
                        </AutoForm>
                        {/* <form className="php-email-form mt-4" data-aos="fade-up" data-aos-delay="400" onSubmit={handleSubmit}>
                            <div className="row">
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
                        </form> */}
                    </div>
                </Slide>
            </div>
        </section >
    )
}

export default graphql(createMessage, {
    name: 'createMessage'
})(ContactUs)
