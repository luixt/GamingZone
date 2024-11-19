import './App.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom'
import ThreadList from './pages/ThreadList'
import CreateComment from './pages/CreateComment'
import EditComment from './pages/EditComment'
import ViewComment from './pages/ViewComment'
import { Link } from 'react-router-dom'


const App = () => {
  
  const comments = [
    
  ]
 
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ThreadList searchQuery={searchQuery} />
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
        <h1>Gaming Zone</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
          className="search-bar"
        />
        <div className='link-group'>
        <Link to="/"><button className="headerBtn"> Home  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create New Post </button></Link>
        </div>
      </div>
      <br></br>
        {element}
    </div>

  );
}

export default App;
