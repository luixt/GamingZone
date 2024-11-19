import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './ViewComment.css';

const ViewComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState('');
  const [editReplyId, setEditReplyId] = useState(null);

  useEffect(() => {
    const fetchThread = async () => {
      const { data, error } = await supabase
        .from('Threads')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setComment(data);
      }
    };

    const fetchReplies = async () => {
      const { data, error } = await supabase
        .from('Replies')
        .select()
        .eq('thread_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching replies:', error);
      } else {
        setReplies(data);
      }
    };

    fetchThread();
    fetchReplies();
  }, [id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('Replies')
      .insert({ thread_id: id, content: newReply });

    if (error) {
      console.error('Error adding reply:', error);
    } else {
      setNewReply('');
      setReplies((prev) => [
        { id: Date.now(), content: newReply, created_at: new Date() },
        ...prev,
      ]);
    }
  };

  const handleEditClick = (reply) => {
    setIsEditing(true);
    setEditedReply(reply.content);
    setEditReplyId(reply.id);
  };

  const handleUpdateReply = async () => {
    const { error } = await supabase
      .from('Replies')
      .update({ content: editedReply })
      .eq('id', editReplyId);

    if (error) {
      console.error('Error updating reply:', error);
    } else {
      setReplies((prev) =>
        prev.map((reply) =>
          reply.id === editReplyId ? { ...reply, content: editedReply } : reply
        )
      );
      setIsEditing(false);
      setEditedReply('');
      setEditReplyId(null);
    }
  };

  const handleDeleteReply = async (replyId) => {
    const { error } = await supabase
      .from('Replies')
      .delete()
      .eq('id', replyId);

    if (error) {
      console.error('Error deleting reply:', error);
    } else {
      setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
    }
  };

  return (
    <div>
      {comment ? (
        <div className="CommentDetail">
          <h2 className="CommentDetail-h2">{comment.title}</h2>
          <p className="CommentDetail-p">{comment.description}</p>
          <div className="center-img">
            <img className="CommentDetail-img" alt="Comment Image" src={comment.image} />
          </div>
          <h3>{"Likes: " + comment.likes}</h3>

          <div className="RepliesSection">
            <h3 className="RepliesSection-h3">Comments</h3>
            {replies.map((reply) => (
              <div key={reply.id} className="RepliesSection-item">
                <p className="RepliesSection-p">{"-> " + reply.content}</p>
                <div className="reply-actions">
                  <button
                    className="reply-form-button edit-button"
                    onClick={() => handleEditClick(reply)}
                  >
                    Edit
                  </button>
                  <button
                    className="reply-form-button delete-button"
                    onClick={() => handleDeleteReply(reply.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form className="reply-form" onSubmit={handleReplySubmit}>
            <textarea
              className="reply-form-textarea"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply..."
              rows="3"
            />
            <button className="reply-form-button" type="submit">
              Reply
            </button>
          </form>

          {isEditing && (
            <>
              <div className="popup-overlay" onClick={() => setIsEditing(false)}></div>
              <div className="edit-popup">
                <textarea
                  value={editedReply}
                  onChange={(e) => setEditedReply(e.target.value)}
                  rows="4"
                  style={{ width: '100%' }}
                />
                <div className="edit-popup-buttons">
                  <button
                    className="reply-form-button update-button"
                    onClick={handleUpdateReply}
                  >
                    Update
                  </button>
                  <button
                    className="reply-form-button cancel-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Loading Thread details...</p>
      )}
    </div>
  );
};

export default ViewComment;
