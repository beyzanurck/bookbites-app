import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'

export default function UserImagePopup({show, onClose, userInfo}) {
    const [user, setUser] = useState({
        email: userInfo,     
        image: ""
    });

    function handleChange(event) {

        const { value, name } = event.target;
        setUser(prevValue => ({...prevValue, [name]: value}));
    }

    function handleSubmit(event) {

        event.preventDefault();
        addUserImage(user)
    }

    async function addUserImage(userData) {

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        return await response.json();
    }

  return (
    <Modal show={show} onHide={onClose} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Add Profile Picture</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <form className='add-note'>

           
            <TextArea 
                placeholder={"Image URL"} 
                name={"image"} 
                value={user.image} 
                onChange={handleChange}
            />
            
        </form>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
</Modal>
  )
}
