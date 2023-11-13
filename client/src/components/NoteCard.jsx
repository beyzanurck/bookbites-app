import React from 'react'
import Card from 'react-bootstrap/Card';


export default function NoteCard({note, name}) {

  return (
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'row', margin: '1rem' }}>

        <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <Card.Title style={{color: 'rgb(239, 193, 154)'}}>{name}</Card.Title>
            <Card.Text>{note}</Card.Text>
        </Card.Body>
    </Card>
  )

}
