import {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import {MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";


export default function BookCard({title, author, img, category, id, faved, status}) {

  const { isAuthenticated, user} = useAuth0();

  const [isFaved, setIsFaved] = useState(faved);


  //sends favorite action info to the feed table
  async function sendFavoriteInfo(auth0_sub, api_id, isFav) {

    const response = await fetch('/api/feed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auth0_sub, api_id, isFav })
    });

    return await response.json();
  }


  // changes isFaved state
  function handleFavories () {

    const newStatus = !isFaved; //setIsFaved is an asycn ()

    setIsFaved(newStatus)
    
    sendFavoriteInfo(user.sub, id, newStatus)
  }


  // turns updates the UI accordingly
  useEffect(() => {
    setIsFaved(faved);
  }, [faved]);

  
  //an obj for the favorite icon
  const iconProps = {
    size: 32,
    style: {
      color: 'red',
    },
    onClick: handleFavories,
    role : "button",
  };
  

  return (

    <Card style={{ width: '13rem'}}>

      <Link to={`/book/${id}`} state={{ faved : isFaved, shelf_status : status }}>
        <Card.Img variant="top" src={img} />
      </Link>

      <Card.Body style={{ position: 'relative'}}>
        <Card.Title>{title}</Card.Title>

        <Card.Text style={{ marginBottom: '1.2rem'}}>
          <strong>Author:</strong> {author} <br />
          <strong>Category:</strong> {category}
        </Card.Text>

        <div  style={{ position: 'absolute', right: '5.3rem', bottom: '0.3rem' }} >

          {
            isAuthenticated && 
            (
              isFaved
                ? <MdFavorite className="favorite-icon" {...iconProps} />
                : <MdFavoriteBorder className="favorite-icon" {...iconProps} />
            )
          }

        </div>

      </Card.Body>
    </Card>

  )
}
