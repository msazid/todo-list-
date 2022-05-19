import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AddTask from './Pages/Tasks/AddTask/AddTask';
import Home from './Pages/Home/Home';
import NotFound from './Pages/Shared/NotFound/NotFound';
import Header from './Pages/Shared/Header/Header';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import Tasks from './Pages/Tasks/Tasks/Tasks';

// or less ideally

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />
        <Route path='/addtask' element={<RequireAuth>
          <AddTask></AddTask>
        </RequireAuth>} />
        <Route path='/alltask' element={<RequireAuth><Tasks></Tasks></RequireAuth>} />
        <Route path='*' element={<NotFound></NotFound>} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
