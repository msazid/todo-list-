import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';

const AddTask = () => {
    
    const [user] = useAuthState(auth);
const handleAddTask =(event)=>{
    event.preventDefault();
    const data = {
        email:event.target.email.value,
        name: event.target.name.value,
        description: event.target.description.value,
    }
    const url = 'http://localhost:5000/task';
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        event.target.reset();
      });
   }
    return (
        <div className='container'>
            <h3 className='text-center'>Add New Task</h3>
            <form onSubmit={handleAddTask}>
                <Form.Control className='my-3' name='email' disabled value={user?.email}></Form.Control>
                <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                    <Form.Control as="textarea" name='name' placeholder="Leave a comment here" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                        as="textarea"
                        name='description'
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
               <div className='d-flex '>
               <Form.Control className='btn my-3 btn-success' type='submit' value='Add Task'/>
               </div>
            </form>
        </div>
    );
};

export default AddTask;