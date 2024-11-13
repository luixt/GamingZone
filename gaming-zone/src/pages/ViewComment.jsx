import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './ViewComment.css';

const ViewComment = () => {
  const { id } = useParams();  // Get the crewmate ID from the URL
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const fetchThread = async () => {
      const { data, error } = await supabase
        .from('Threads')
        .select()
        .eq('id', id)  // Query for the specific crewmate by ID
        .single();  // Fetch one crewmate

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setComment(data);
      }
    };

    fetchThread();
  }, [id]);

  return (
    <div >
      {comment ? (
        <div className="CrewmateDetail">
          <h2>{comment.title}</h2>
          <p>{comment.description}</p>
          <h3 >{comment.image}</h3>
          <h3>{"Likes: " + comment.likes}</h3>
        </div>
      ) : (
        <p>Loading Thread details...</p>
      )}
    </div>
  );
};

export default ViewComment;
