import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

export default function BookCard({title, author, img, category}) {
  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {author} <br />
                  <strong>Category:</strong> {category}
                </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
  )
}
