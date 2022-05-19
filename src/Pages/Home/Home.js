import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
const Home = () => {
    return (
        <div className='homeBg'>
         <div className='d-flex justify-content-center align-items-center'>
            <div className='text-center'>
            <h1 className='text-center text-white'>Welcome to the daily todo list tracker</h1>
            <p className='text-center text-white'>You can easily make a todo list in this react app</p>
            <Link className='btn btn-warning text-white' to='/addtask'>Click here to add new tasks</Link>
            </div>     
        </div>   
        </div>
    );
};

export default Home;