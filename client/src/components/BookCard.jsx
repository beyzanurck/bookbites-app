import React from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';
import {MdFavoriteBorder } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";


export default function BookCard({title, author, img, category, id}) {

  const navigate = useNavigate();
  const { isAuthenticated} = useAuth0();


  return (

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} onClick={() => {navigate(`/book/${id}`)}} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Author:</strong> {author} <br />
            <strong>Category:</strong> {category}
          </Card.Text>

          {
            isAuthenticated && <MdFavoriteBorder size={32} style={{ color: 'red' }}/>
          }
          
        </Card.Body>
    </Card>

  )
}
