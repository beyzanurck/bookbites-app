import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'
import NoteVisibility from './NoteVisibility'

export default function NotePopup({ show, onClose, books, feeds, noteUpdated }) {

    const [action, setAction] = useState({
        "isNotePrivate": false,
        "note": "",
        "feed_id": ""
    });

    const [selectedBookApiId, setSelectedBookApiId] = useState('');


    function handleChange(event) {
        const { value, name } = event.target;
        
        if (name === "feed_id") {

            setSelectedBookApiId(value);

            if(value) {

                console.log("value: ", value)
                const bookApiId = value;
                const matchingFeed = feeds.find(item => item.api_id === bookApiId);
                const feed_id = matchingFeed ? matchingFeed.feed_id : "";
                console.log("feedid: ", feed_id)
                setAction(prevValue => ({ ...prevValue, feed_id: feed_id }));
            }
            else {
                
                setAction(prevValue => ({ ...prevValue, feed_id: "" }));
            }

            

        } else {
            setAction(prevValue => ({ ...prevValue, [name]: value }));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("action: ", action);
        addNoteYourFeed(action)
    }


    //adds note
    async function addNoteYourFeed(action) {

        const response = await fetch('/api/note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action)
        });

        noteUpdated()
        return await response.json();
    }

  return (
    <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form className='add-note'>

            {
                books && 
                <select name="feed_id" value={selectedBookApiId} onChange={handleChange}>
                    <option value="" disabled> select a status</option>
                    {books.map((book, index) => (
                        <option key={index} value={book.api_id}> {book.title} </option>
                    ))}
                </select>
            }

                <NoteVisibility onChange={handleChange} />

                <TextArea 
                placeholder={"Note"} 
                name={"note"} 
                value={action.note} 
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
