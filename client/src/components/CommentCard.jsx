import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CommentCard({ text, userName, date, rating }) {
  return (
    <Card style={{ width: '48rem', display: 'flex', flexDirection: 'row', margin: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <Card.Img 
          style={{ width: '64px', height: '64px', borderRadius: '50%' }} 
          src={"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} 
        />
      </div>
      
      <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <Card.Title>{userName}</Card.Title>
        {/* Render star rating based on rating */}
        <div>
          {/* Placeholder for star rating, replace with your star component */}
          {`Rating: ${rating}`}
        </div>
        <Card.Text>{text}</Card.Text>
        <div style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>{date}</div>
      </Card.Body>
    </Card>
  );
}

