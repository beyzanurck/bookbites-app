import {useState, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";
import SelectStatus from '../components/SelectStatus';
import TextArea from '../components/TextArea';
import CommentCard from '../components/CommentCard';
import StarRating from '../components/StarRating';
import '../styles/Book.css'


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

    const [comment, setComment] = useState({
        "text" : "",
        "date" : new Date().toISOString().split('T')[0] + ' 00:00:00',
        "rate" : 0
    })

    const [commentList, setCommentList] = useState([])

    //activate textarea
    const [enableCommenting, setEnableCommenting] = useState(true)
  
    
    //Get specific book info
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
    //


    //sends favorite and status action info to the feed table
    async function sendActionInfo(auth0_sub, api_id, isFav, shelf_status) {

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


    //add new comment
       async function newComment(auth0_sub, api_id, comment) {

        const response = await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth0_sub, api_id, ...comment })
        });

        return await response.json();
    }

    function handleChange(event){

        const {value, name} = event.target

        setComment((preValue) => ({...preValue, [name]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // newComment(user.sub, id, comment);

        //shows the new comment immediately on the page
        try {
            
            const newCommentResponse = await newComment(user.sub, id, comment);
            setCommentList(preValue => [...preValue, newCommentResponse]);
            console.log("submit: ", newCommentResponse)
            setComment({
                "text" : "",
                "date" : new Date().toISOString().split('T')[0] + ' 00:00:00',
                "rate" : 0
            });
    
        } catch (error) {
            console.log(error.message);
            //show an error message to the user
        }
    }
    //


    //gets the book's comments
    async function getComments(id, auth0_sub) {

        try {
            const response = await fetch(`/api/comment/${id}/${auth0_sub}`);
    
            const allComments = await response.json();

            const userHasCommented = allComments.some(comment => comment.auth0_sub === auth0_sub);
            setEnableCommenting(!userHasCommented);

            setCommentList(allComments);

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getComments(id, user.sub);
    }, [commentList]);
    //

    const iconProps = {
        size: 32,
        style: {
          color: 'red',
        },
        onClick: handleFavories,
    };

    function handleRating(rate) {
        setComment(prevValue => ({...prevValue, rate }));
    }


  return (
    <div className='book-page'>

        <div className='book-page-left'>

            <img src={book?.[0]?.image_url}/>

            <div>

                {
                    isAuthenticated && 
                    (
                    action.isFaved
                        ? <MdFavorite {...iconProps} />
                        : <MdFavoriteBorder {...iconProps} />
                    )
                }

            </div>
            
            <SelectStatus value = {action.status} onChange = {handleSelect}/>

        </div>

        <div className='book-page-right'>

            <div className='book-details'>
                
                <p>{book?.[0]?.title}</p>
                <p>{book?.[0]?.description}</p>

            </div>

            <form className='new-comment' onSubmit={handleSubmit}>

                <div>

                    <TextArea 
                        placeholder={"Comment"} 
                        name = {"text"} 
                        value = {comment.text} 
                        onChange={handleChange} 
                        disabled={!enableCommenting}
                    /> 

                    <p id='instruction-bp'>Please rate the book to submit your comment.</p>

                </div>

                <div className="rating-bp">

                    <StarRating 
                        rating={comment.rate} 
                        onRating={handleRating} 
                        text = {comment.text} 
                    />

                </div>
 
            </form>

            <div className='display-comments-bp'>

                {
                    commentList.map((item, index) => (
                        <CommentCard 
                            key = {index}
                            text = {item.text}
                            userName = {item.first_name + " " + item.last_name}
                            date = {item.date}
                            rating={item.rate}
                            icon = {item.auth0_sub === user.sub}
                            commentId = {item.comment_id}
                        />
                    ))
                }

            </div>
        
        </div>
                
    </div>
  )
}
