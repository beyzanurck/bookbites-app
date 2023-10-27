import {useState} from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';
import {MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";


export default function BookCard({title, author, img, category, id}) {

  const navigate = useNavigate();
  const { isAuthenticated, user} = useAuth0();

  const [isFaved, setIsFaved] = useState(false);


  function handleFavories () {
    setIsFaved(!isFaved)
    console.log("favorite:", user.sub, id, !isFaved)
    sendFavoriteInfo(user.sub, id, !isFaved)
  }

  async function sendFavoriteInfo(auth0_sub, api_id, isFav) {

    const response = await fetch('http://localhost:1212/feed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auth0_sub, api_id, isFav })
    });

    return await response.json();
}


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
            isAuthenticated && 
            (
              isFaved ? <MdFavorite size={32} style={{ color: 'red' }} onClick={handleFavories}/>
              : <MdFavoriteBorder size={32} style={{ color: 'red' }} onClick={handleFavories}/>
            )
          }
          
        </Card.Body>
    </Card>

  )
}
