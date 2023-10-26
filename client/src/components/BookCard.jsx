import {useState} from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';
import {MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";


export default function BookCard({title, author, img, category, id}) {

  const navigate = useNavigate();
  const { isAuthenticated, user} = useAuth0();

  const [isFaved, setIsFaved] = useState(false);
  const [userBook, setUserBook] = useState({
    "api_id":"",
    "user_email":"",
    "isFavorite": false,
    "shelf_status": 0,
    "note": ""
  })

  function handleFavories () {
    setIsFaved(!isFaved)

    updateUserBook(userBook)
  }

  const updateUserBook = async (data) => {
    try {
      
      const response = await fetch(`http://localhost:1212/users/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...data, user_email : user.email, isFavorite : isFaved})
      })

    
    } catch (error) {
      console.error(error.message)
    }
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
