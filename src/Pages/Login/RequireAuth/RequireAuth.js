import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../Firebase/Firebase.init';
import Loading from '../../Shared/Loading/Loading';



const RequireAuth = ({ children }) => {

    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center verify-email'>
            <div className='text-center mb-2'>
                <h5 className='item-h5'>Verify!?</h5>
                <h1 className='item-h1 mb-3'>please <span className='text-danger'>verify</span> your email</h1>
                <h5 className='item-h5'>refresh your page after verified</h5>
            </div>
            <button
                className='verify-button'
                onClick={async () => {
                    await sendEmailVerification();
                    alert('Email sent successful')
                }}
            >
                Send Verification Email Again
            </button>
        </div>
    }

    return children;
};

export default RequireAuth;