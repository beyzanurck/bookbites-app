import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'

export default function EditCommentPopup({show, onClose, text, rating}) {

    const [editedComment, setEditedComment] = useState({
        "text" : text,
        "rating" : rating,
        "date" : new Date().toISOString().split('T')[0] + ' 00:00:00'
    })

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Modal show={show} onHide={onClose} size="lg">

            <Modal.Header closeButton>
                <Modal.Title>Edit Your Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form className='edit-comment' onSubmit={handleSubmit}>

                    {/* start rating here */}

                    <TextArea 
                        placeholder={"Comment"} 
                        name = {"text"} 
                        value = {editedComment.text} 
                        // onChange={handleChange}
                    />
                    
                </form>
                    
            </Modal.Body>

            <Modal.Footer>

                <Button variant="primary" type="submit" >Save</Button>

                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

            </Modal.Footer>

        </Modal>
    )
}
