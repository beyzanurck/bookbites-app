import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'

export default function NotePopup({show, onClose}) {

    const [action, setAction] = useState({
        "isNotePrivate" : false,
        "note" : ""
    })

    function handleChange (event) {

        const { value, name } = event.target;
        setAction((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function handleSubmit(event) {

        event.preventDefault();
    }


  return (
    <Modal show={show} onHide={onClose} size="lg">

        <Modal.Header closeButton>
            <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form className='add-note'>


                <TextArea 
                    placeholder={"Note"} 
                    name = {"note"} 
                    value = {action.note} 
                    onChange={handleChange}
                />

            </form>
                
        </Modal.Body>

        <Modal.Footer>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>

            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>

        </Modal.Footer>

    </Modal>
  )
}
