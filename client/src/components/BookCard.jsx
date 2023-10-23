import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function BookCard({title, author, img, category, id}) {

  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} onClick={() => {navigate(`/book/${id}`)}} />
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
