import React from 'react'
import Card from 'react-bootstrap/Card';


export default function NoteCard({note}) {

  return (
    <Card style={{ width: '48rem', display: 'flex', flexDirection: 'row', margin: '1rem' }}>

        <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <Card.Title>Book Name Here</Card.Title>
            <Card.Text>{note}</Card.Text>
        </Card.Body>
    </Card>
  )

}
