import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'

export default function UserImagePopup({show, onClose, userInfo, onImageUpdated}) {
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

        onImageUpdated();
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
        <Button variant="primary" onClick={handleSubmit} style={{backgroundColor: 'rgb(239, 193, 154)', borderColor: 'rgb(239, 193, 154)', color: 'rgb(0,46,97)'}}>Save</Button>
        <Button variant="secondary" onClick={onClose} style={{backgroundColor: 'rgb(0,46,97)', borderColor: 'rgb(0,46,97)', color: 'rgb(239, 193, 154)'}} >Close</Button>
    </Modal.Footer>
</Modal>
  )
}
