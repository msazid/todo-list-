import React from 'react';
import { Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
const Register = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate()
    let signInError;
    if(loading|| gLoading || updating){
        return <Loading/>;
    }
    if(error || gError || updateError ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error?.message || gError?.message}`,
          })
    }
    const handleRegister = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(email,password);
        updateProfile({ displayName: name });
        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Successfully Registered Thank you',
            showConfirmButton: false,
            timer: 1500
          })
    }
    if(user || gUser){
        Swal.fire({
            position:'center-center',
            icon: 'success',
            title: 'Successfully Registered',
            showConfirmButton: false,
            timer: 1500
          })
        navigate('/addtask');
    }
    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Form className='w-50'onSubmit={handleRegister}>
                    <h1 className='text-dark'>Register</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Control required name='name' type="text" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required name='email' type="email" placeholder="Enter your email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control required name='password' type="password" placeholder="Enter a new Password" />
                    </Form.Group>
                    <p>Already Registered  <Link to='/login'>Login </Link> Now</p>
                    <div className='d-flex justify-content-center'>
                        <Form.Control className='btn w-50 btn-warning  fs-5' type='submit' value='SignUp' />
                    </div>
                    {signInError}
                </Form>
            </div>
            <div className='d-flex justify-content-center my-3'>
                <GoogleButton className=''
                    onClick={() => { signInWithGoogle() }}
                />
            </div>
        </div>
    );
};

export default Register;