import React, { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import { supabase } from '../client.jsx';
import './ThreadList.css';


const ThreadList = ({ searchQuery }) => {
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  
  useEffect(() => {
    const fetchThread = async () => {
      const { data } = await supabase
        .from('Threads')
        .select()
        .order('created_at',  { ascending: sortOrder === 'oldest' });

      setComments(data);
    };

    fetchThread();
  }, [sortOrder]);
  
    
  const filteredComments = comments.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
      
  const handleNewestClick = () => {
    setSortOrder('newest');
  };

  
  const handleMostPopularClick = () => {
    setSortOrder('popular');
  };

 
  const sortedComments = sortOrder === 'popular'
    ? [...filteredComments].sort((a, b) => b.likes - a.likes)
    : filteredComments;

  return (
    <div>
      <div className='filter'>
          <h3>Order By: </h3>
          <button className="bttn-filter" onClick={handleNewestClick}>Newest</button>
          <button className="bttn-filter" onClick={handleMostPopularClick}>Most Popular</button>
      </div>
      {sortedComments && sortedComments.length > 0 ? (
        sortedComments.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            time={post.created_at}
            title={post.title}
            description={post.description}
            image={post.image}
            likes={post.likes}
          />
        ))
      ) : (
        <h2>No Posts Found 😞</h2>
      )}
    </div>
  );
};

export default ThreadList;