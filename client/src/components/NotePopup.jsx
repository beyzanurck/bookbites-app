import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextArea from './TextArea'
import NoteVisibility from './NoteVisibility'
import '../styles/Profile.css'

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

                const bookApiId = value;
                const matchingFeed = feeds.find(item => item.api_id === bookApiId);
                const feed_id = matchingFeed ? matchingFeed.feed_id : "";
               
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

                <div className='menu-and-visibility'>
                    {
                        books && 
                        <select name="feed_id" value={selectedBookApiId} onChange={handleChange}>
                            <option value="" disabled> select a book</option>
                            {books.map((book, index) => (
                                <option key={index} value={book.id}> {book.volumeInfo.title} </option>
                            ))}
                        </select>
                    }

                    <NoteVisibility onChange={handleChange} />
                </div>

                <TextArea 
                    placeholder={"Note"} 
                    name={"note"} 
                    value={action.note} 
                    onChange={handleChange}
                />

            </form>
        </Modal.Body>


        <Modal.Footer>

            <Button variant="primary" onClick={handleSubmit} 
                style={{backgroundColor: 'rgb(239, 193, 154)', borderColor: 'rgb(239, 193, 154)', color: 'rgb(0,46,97)'}}
            >Save</Button>

            <Button variant="secondary" onClick={onClose}
                style={{backgroundColor: 'rgb(0,46,97)', borderColor: 'rgb(0,46,97)', color: 'rgb(239, 193, 154)'}}
            >Close</Button>

        </Modal.Footer>
    </Modal>
  )
}
