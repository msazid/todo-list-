import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { useSignInWithGoogle, useSignInWithEmailAndPassword, useAuthState, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Loading from '../../Shared/Loading/Loading';
import auth from '../../../Firebase/Firebase.init';
import Swal from 'sweetalert2';

const Login = () => {
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const emailRef = useRef()
    const [registeredUser] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate()
    let from = location.state?.from?.pathname || "/";
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (registeredUser) {
        navigate('/');
    }
    if (loading || gLoading || sending) {
        return <Loading></Loading>;
    }
    if (user || gUser) {
        navigate(from, { replace: true });
    }
    if (error || gError) {
        Swal.fire({
            icon: 'error',
            title: `${error.gError || error.error}`,
          })
    }
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            Swal.fire({
                icon: 'success',
                title: `mail has been sent please check your inbox`,
              })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Please enter email address',
              })
        }
    }


    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        await signInWithEmailAndPassword(email, password);
    }

    return (
        <div className='my-5 d-flex'>
            <div className='p-5 mx-auto'>
                <h4 className='py-2 text-center'>Login</h4>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" name='email' />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Group className="mb-3 " controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" name='password' />
                    </Form.Group>
                </Form.Group>
            
                <div className=' text-center'>
                <button type="submit" class="btn  btn-warning">Login</button>
                </div>
            </Form>
            <div className=''>
            <p className="">New here please<Link style={{textDecoration:'none'}} className="ms-2" to="/register">
                         Create a new Account 
                    </Link>
                </p>
                <p onClick={resetPassword}style={{cursor:'pointer'}} className='text-primary'>Forgot password?</p>
            </div>
            <GoogleButton
                className="mx-auto rounded-3"
                onClick={() => signInWithGoogle()}
            />
            </div>
        </div>
    );
};

export default Login;