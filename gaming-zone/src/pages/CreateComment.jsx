import React, { useState } from 'react';
import './CreateComment.css';
import { supabase } from '../client';


const CreateComment = () => {

    const createThread = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Threads')
          .insert({title: comment.title, description: comment.description, image: comment.image, likes: comment.likes})
          .select();
      
        window.location = "/";
    }

    const [comment, setComment] = useState({title: "", description: "", image: "", likes: 0});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setComment( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }


    return (
        <div>
            <form>
                <label >Title</label>
                <input type="text" id="title" name="title" value={comment.title} onChange={handleChange} /><br />
                <br/>

                <label >Description</label>
                <input type="text" id="description" name="description" value={comment.description} onChange={handleChange} /><br />
                <br/>

                <label >Image</label>
                <input type="text" id="image" name="image" value={comment.image} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Post" onClick={createThread} />
            </form>
        </div>
    )
}

export default CreateComment;