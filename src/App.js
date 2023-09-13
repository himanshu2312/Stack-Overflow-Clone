import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllQuestions }  from './actions/question.js';
import { fetchAllUsers } from "./actions/user.js"

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
