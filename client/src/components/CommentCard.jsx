import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {AiFillEdit } from 'react-icons/ai';
import {MdDelete } from 'react-icons/md';
import EditCommentPopup from './EditCommentPopup';
import StarDisplay from './StarDisplay';
import '../styles/CommentCard.css'

export default function CommentCard({ text, userName, date, rating, icon, commentId, onCommentUpdated, userImage }) {

  const [show, setShow] = useState(false)

  async function deleteComment(id) {

    try {
        const deletePost = await fetch(`/api/comment/${id}`, 
        {method: "DELETE"})
    } catch (error) {
        console.error(error.message)
    }

    onCommentUpdated?.();
  }

  //month as a str/ day/ year
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });


  return (
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'row',  margin: '1rem'}}>
      
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Card.Img 
          style={{ width: '64px', height: '64px', borderRadius: '50%' }} 
          src={userImage} 
        />
      </div>

      <Card.Body style={{ position: 'relative' ,flex: '1', display: 'flex', flexDirection: 'column' }}>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Card.Title>{userName}</Card.Title>
          <div style={{ fontStyle: 'italic', fontSize: '0.85rem'}}>{formattedDate}</div>
        </div>

        <div>
          <StarDisplay rating={rating} />
        </div>

        <Card.Text>{text}</Card.Text>

        {
          icon &&
          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }} >
              <AiFillEdit className = "editIcon" size={20} style={{color: 'rgb(239, 193, 154)'}} onClick={() => {setShow(true)}}/>
              <MdDelete className = "deleteIcon" size={20} style={{color: 'rgb(0,46,97)'}} onClick={() => {deleteComment(commentId)}}/>
          </div> 
        }

        {
          show && 
          <EditCommentPopup 
              show = {show}
              onClose={() => {setShow(false)}}
              text = {text}
              rating = {rating}
              comment_id = {commentId}
              onCommentUpdated={onCommentUpdated}
          />
        }

      </Card.Body>
    </Card>
  );
}

