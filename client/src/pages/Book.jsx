import {useState, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";


export default function Book() {

    const { isAuthenticated, user } = useAuth0();
    const [book, setBook] = useState([]);

    let { id } = useParams();

    //coming from Link
    const location = useLocation();
    const { faved } = location.state || {} ;
    const [isFaved, setIsFaved] = useState(faved);

  
    async function getBookById() {
        try {

            const response = await fetch(`/api/${id}`);
            const theBook = await response.json()

            setBook(theBook)

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBookById();
    }, []);


    //sends favorite and status action info to the feed table
    async function sendActionInfo(auth0_sub, api_id, isFav, shelf_status) {
        console.log(auth0_sub, api_id, isFav, shelf_status)
        const response = await fetch('/api/feed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth0_sub, api_id, isFav, shelf_status })
        });

        return await response.json();
    }


    function handleFavories () {

        const newStatus = !isFaved;
    
        setIsFaved(newStatus)

        sendActionInfo(user.sub, id, newStatus, 1)
    }

    
    const iconProps = {
        size: 32,
        style: {
          color: 'red',
        },
        onClick: handleFavories,
    };

  return (
    <div>

      <div className='top'>

        <div className='book-img'>

            <img src={book?.[0]?.image_url}/>
            
            {
                isAuthenticated && 
                    (
                    isFaved
                        ? <MdFavorite {...iconProps} />
                        : <MdFavoriteBorder {...iconProps} />
                    )
            }

            <select>
                <option value="read">Read</option>
                <option value="to-read">To Read</option>
                <option value="currently-reading">Currently Reading</option>
            </select>
        </div>

    
        <div className='book-details'>
            
            <p>{book?.[0]?.title}</p>
            <p>{book?.[0]?.description}</p>

            <div>
                <textarea  rows="10" cols="60" />

                <button> Add Comment </button>
            </div>
        </div>

      </div>
     
    </div>
  )
}
