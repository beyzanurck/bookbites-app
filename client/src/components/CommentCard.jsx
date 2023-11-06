import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {AiFillEdit } from 'react-icons/ai';
import {MdDelete } from 'react-icons/md';
import EditCommentPopup from './EditCommentPopUp';

export default function CommentCard({ text, userName, date, rating, icon, commentId }) {

  const [show, setShow] = useState(false)

  async function deleteComment(id) {

    try {
        const deletePost = await fetch(`/api/comment/${id}`, 
        {method: "DELETE"})
    } catch (error) {
        console.error(error.message)
    }
  }


  return (
    <Card style={{ width: '48rem', display: 'flex', flexDirection: 'row', margin: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Card.Img 
          style={{ width: '64px', height: '64px', borderRadius: '50%' }} 
          src={"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} 
        />
      </div>
      
      <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <Card.Title>{userName}</Card.Title>

        <div>
          {/* Placeholder for star rating */}
          {`Rating: ${rating}`}
        </div>
        <Card.Text>{text}</Card.Text>
        <div style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>{date}</div>

        {
            icon &&
            <div>
                <AiFillEdit size={32} style={{color: 'red'}} onClick={() => {setShow(true)}}/>
                <MdDelete size={32} style={{color: 'green'}} onClick={() => {deleteComment(commentId)}}/>
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
            />
        }

      </Card.Body>
    </Card>
  );
}

