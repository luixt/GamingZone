import React, { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import { supabase } from '../client.jsx';
import './ThreadList.css';


const ThreadList = (props) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {

        const fetchThread = async () => {
            const {data} = await supabase
                .from('Threads')
                .select()
                .order('created_at', { ascending: true })

                // set state of posts
                setComments(data);
        }

        fetchThread();
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                comments && comments.length > 0 ?
                comments.map((post) => 
                   <Card key={post.id} id={post.id} title={post.title} description={post.description} image={post.image} likes={post.likes}/>
                ) : <h2>No Posts Yet 😞</h2>
            }
        </div>  
    )
}

export default ThreadList;