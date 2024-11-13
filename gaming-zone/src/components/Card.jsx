import React from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  return (
      <div className="Card">
          <Link to={'/edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <Link to={'/comments/' + props.id} className="card-link">
          <h2>{props.title}</h2>
          <h3>{"Likes: " + props.likes}</h3>
          </Link>
      </div>
  );
};

export default Card;