import React, { useEffect, useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase.init';
import useData from '../../../Hooks/useData';

const Tasks = () => {
    const [user] = useAuthState(auth);
    const [getUser,setGetUser] = useState([]);
    useEffect(()=>{
    if(user){
    fetch(`http://localhost:5000/tasks?email=${user.email}`)
    .then(res => res.json())
    .then(data => setGetUser(data))
    }
    }
    ,[user]);
    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure want to delete the task ?')
        if(proceed){
            const url = (`http://localhost:5000/tasks/${id}`);
            fetch(url,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(result =>{
                const remaining = setGetUser.filter(data=>data._id === id);
                setGetUser(remaining);
            })
        }
         
    }
    return (
        <div>
            <h3 className='text-center'>This User's: <span className="text-success">{user?.email}</span> todo list</h3>
            <Table className='container' >
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getUser?.map((u,index) =>
                            <tr>
                                <td>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>{u.name}</Accordion.Header>
                                            <Accordion.Body>
                                                {
                                                    u.description
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion></td>
                                <td><button className='btn btn-danger' onClick={()=>{handleDelete(u._id)}}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Tasks;