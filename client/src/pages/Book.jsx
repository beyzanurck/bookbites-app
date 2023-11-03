import {useState, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";
import SelectStatus from '../components/SelectStatus';


export default function Book() {

    const { isAuthenticated, user } = useAuth0();
    const [book, setBook] = useState([]);

    let { id } = useParams();

    //coming from Link
    const location = useLocation();
    const { faved, shelf_status } = location.state || {} ;
 
    const [action, setAction] = useState({
        "isFaved" : faved,
        "status" : ""
    })

  
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

        const newStatus = !action.isFaved;
        setAction((prevValue)=> ({...action, isFaved : newStatus}));
    }


    function handleSelect (event) {

        const value = event.target.value;

        setAction((prevValue)=> ({...action, status : value})); 
    }
    
    //turns str status to int to add it to the db
    useEffect(() => {

        let status_code; 
        switch (action.status) {

            case 'read':
                status_code = 0
            break;

            case 'to-read':
                status_code = 1
            break;

            case 'currently-reading':
                status_code = 2
            break;

            default:
        }

        sendActionInfo(user.sub, id, action.isFaved, status_code)

    }, [action]);

  //int status comes from db. Turn it to str status
    useEffect(() => {
        switch (shelf_status) {

            case 0:
                setAction((prevValue)=> ({...action, status : "read"}));
            break;

            case 1:
                setAction((prevValue)=> ({...action, status : "to-read"}));
            break;

            case 2:
                setAction((prevValue)=> ({...action, status : "currently-reading"}));
            break;

            default:
        }
    }, [shelf_status]);


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
                    action.isFaved
                        ? <MdFavorite {...iconProps} />
                        : <MdFavoriteBorder {...iconProps} />
                    )
            }

            <SelectStatus value = {action.status} onChange = {handleSelect}/>

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
