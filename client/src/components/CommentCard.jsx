import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {AiFillEdit } from 'react-icons/ai';
import {MdDelete } from 'react-icons/md';
import EditCommentPopup from './EditCommentPopUp';
import StarDisplay from './StarDisplay';

export default function CommentCard({ text, userName, date, rating, icon, commentId, onCommentUpdated }) {

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


  return (
    <Card style={{ width: '48rem', display: 'flex', flexDirection: 'row'}}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Card.Img 
          style={{ width: '64px', height: '64px', borderRadius: '50%' }} 
          src={"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} 
        />
      </div>

      <Card.Body style={{ position: 'relative' ,flex: '1', display: 'flex', flexDirection: 'column' }}>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>

          <Card.Title>{userName}</Card.Title>
          <div style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>{date}</div>

        </div>

        <div>
          <StarDisplay rating={rating} />
        </div>

        <Card.Text>{text}</Card.Text>

        {
            icon &&
            <div style={{ position: 'absolute', bottom: '10px', right: '10px' }} >
                <AiFillEdit size={20} style={{color: 'green'}} onClick={() => {setShow(true)}}/>
                <MdDelete size={20} style={{color: 'red'}} onClick={() => {deleteComment(commentId)}}/>
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

