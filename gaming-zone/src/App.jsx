import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ThreadList from './pages/ThreadList'
import CreateComment from './pages/CreateComment'
import EditComment from './pages/EditComment'
import ViewComment from './pages/ViewComment'
import { Link } from 'react-router-dom'


const App = () => {
  
  const comments = [
    
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ThreadList />
    },
    {
      path:"/edit/:id",
      element: <EditComment data={comments} />
    },
    {
      path:"/comments/:id",
      element: <ViewComment />
    },
    {
      path:"/new",
      element: <CreateComment />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <Link to="/"><button className="headerBtn"> Crewmate Factory 🏢  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Character 🔦 </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
