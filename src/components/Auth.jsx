import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const intialState = { 
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
};

const Auth = () => {

    const [form, setForm] = useState(intialState)

    const [isSignUp, setIsSignUp] = useState(false);
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }) //the form state (initial state) is not a single field, it's actually an object.
    //we have to spread all the items of the object, to do that we use ...form at the beggining of the object.
    //then put in square brackets e.target.name => that targets each input of the form. and just then get the value of the input.
    };
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp); //this is the correct way to change the state depending on the previous state of isSignUp on react. (you can also use !isSignUp)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://frosty-sun-1139.fly.dev/auth';

        //axios create the comunication between the front and the back end, it sends the request to the back end.
        const { data: {token, userId, hashedPassword, fullName} } = await axios.post(`${URL}${isSignUp ? '/signup' : '/login'}`, { //we are sending a post request to the server. indicating as first parameter the URL and if it is singin or singup.
            username, password, fullName: form.fullName, phoneNumber, avatarURL, //the second parameter are the variables we want to send in or request to the backend.
        }); //data in this case is the "data" we recieve back from the backend. so we destructure as token, userID and hashedPassword.
    
        //cookies set the variables the api (Stream) takes to create a user.
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignUp) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input
                                    type='text'
                                    name='fullName'
                                    placeholder='full Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                name='username'
                                placeholder='Username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input
                                    type='text'
                                    name='phoneNumber'
                                    placeholder='Phone Number'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>Avatar URL</label>
                                <input
                                    type='text'
                                    name='avatarURL'
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignUp
                                ? 'Already have an account? '
                                : "Don't have an account? "
                            }
                            <span onClick={switchMode}>
                                {isSignUp ? 'Sign in' : 'Sign up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
            <img src={signinImage} alt="sign in"/>
            </div>    
        </div>
    )
}

export default Auth
