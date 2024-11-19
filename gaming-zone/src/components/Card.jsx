import React, { useState } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client.jsx'; 
import { formatDistanceToNow, parseISO } from 'date-fns';

const Card = (props) => {
  const [likes, setLikes] = useState(props.likes); 

  
  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes); 

    
    const { error } = await supabase
      .from('Threads') 
      .update({ likes: newLikes })
      .eq('id', props.id); 

    if (error) {
      console.error('Error updating likes:', error.message);
      
      setLikes(likes);
    }
  };

  const timeAgo = formatDistanceToNow(parseISO(props.time), { addSuffix: true });

  return (
    <div className="Card">
      <Link to={'/edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <p className="time">{"created " + timeAgo}</p>
      <Link to={'/comments/' + props.id} className="card-link">
        <h2>{props.title}</h2>
      </Link>
      <div className="likes">
        <img
          className="heart"
          alt="like button"
          src="/heart.png"
          onClick={handleLike} 
          style={{ cursor: 'pointer' }} 
        />
        <h3>{likes}</h3>
      </div>
    </div>
  );
};

export default Card;
