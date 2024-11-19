import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './EditComment.css';
import { supabase } from '../client';


const EditComment = ({data}) => {

    const {id} = useParams();
    const [comment, setComment] = useState({id: null, title: "", description: "", image: "", likes: 0});

    useEffect(() => {
        const fetchThread = async () => {
          const { data, error } = await supabase
            .from('Threads')
            .select()
            .eq('id', id)  // Query for the specific crewmate by ID
            .single();  // Fetch one crewmate
    
          if (error) {
            console.error('Error fetching posts:', error);
          } else {
            setComment(data);
          }
        };
    
        fetchThread();
      }, [id]);

    const deleteThread = async (event) => {
        event.preventDefault();
    
        // Delete all replies associated with the thread
        const { error: deleteRepliesError } = await supabase
            .from('Replies')
            .delete()
            .eq('thread_id', id);
    
        if (deleteRepliesError) {
            console.error('Error deleting replies:', deleteRepliesError);
            return; // Stop further execution if there's an error deleting replies
        }
    
        // Delete the thread itself
        const { error: deleteThreadError } = await supabase
            .from('Threads')
            .delete()
            .eq('id', id);
    
        if (deleteThreadError) {
            console.error('Error deleting thread:', deleteThreadError);
            return;
        }
    
        // Redirect to home page after successful deletion
        window.location = "/";
    };

    const updateThread = async (event) => {
        event.preventDefault();

        await supabase
            .from('Threads')
            .update({ title: comment.title, description: comment.description, image: comment.image})
            .eq('id', id);

        window.location = "/";
    }

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
                <input className="text-box-short" type="text" id="title" name="title" value={comment.title} onChange={handleChange} /><br />
                <br/>

                <label>Description</label>
                <textarea 
                    className="text-box-big" 
                    id="description" 
                    name="description" 
                    value={comment.description} 
                    onChange={handleChange} 
                    rows="5"
                /><br />
                <br />

                <label >Image</label>
                <input className="text-box-short" type="text" id="image" name="image" value={comment.image} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Update" onClick={updateThread}/>
                <button className="deleteButton" onClick={deleteThread}>Delete</button>
            </form>
        </div>
    )
}

export default EditComment;