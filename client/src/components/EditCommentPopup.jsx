import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'

export default function EditCommentPopup({show, onClose, text, rating, comment_id, onCommentUpdated}) {

    const [editedComment, setEditedComment] = useState({
        text,
        "rate" : rating,
        comment_id
    })

    function handleChange (event) {

        const { value, name } = event.target;
        setEditedComment((prevValue) => ({ ...prevValue, [name]: value }));
    }

    async function updateComment () {

        try {
          const response = await fetch(`/api/comment`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedComment)
          })
    
        } catch (error) {
          console.error(error.message)
        }
    }

    function handleSubmit(event) {

        event.preventDefault();
        updateComment().catch(console.error);
        onCommentUpdated?.();
    }

    return (
        <Modal show={show} onHide={onClose} size="lg">

            <Modal.Header closeButton>
                <Modal.Title>Edit Your Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form className='edit-comment'>

                    {/* start rating here */}

                    <TextArea 
                        placeholder={"Comment"} 
                        name = {"text"} 
                        value = {editedComment.text} 
                        onChange={handleChange}
                    />

                </form>
                    
            </Modal.Body>

            <Modal.Footer>

                <Button variant="primary" type="submit" onClick={handleSubmit} style={{backgroundColor: 'rgb(239, 193, 154)', borderColor: 'rgb(239, 193, 154)', color: 'rgb(0,46,97)'}}>Save</Button>

                <Button style={{backgroundColor: 'rgb(0,46,97)', borderColor: 'rgb(0,46,97)', color: 'rgb(239, 193, 154)'}}  variant="secondary" onClick={onClose}>
                    Close
                </Button>

            </Modal.Footer>

        </Modal>
    )
}
