import {React, useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import NoteCard from '../components/NoteCard';
import SelectStatus from '../components/SelectStatus';
import BookCard from '../components/BookCard';
import CommentCard from '../components/CommentCard';
import NotePopup from '../components/NotePopup'

export default function Profile() {
  
  const { isAuthenticated, user } = useAuth0();
  //modal shows up
  const [show, setShow] = useState(false)
  //stores data from 3 tables
  const [allActions, setAllActions] = useState([])
  //dropdown menu
  const [selectStatus, setSelectStatus] = useState("")

  const [bookIds, setBookIds] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([])

  const [activeTab, setActiveTab] = useState('books');

  //gets all infos from 3 tables
  async function getUserAllActions(id) {

    try {
      const response = await fetch(`/api/profile/${id}`);

      const allActions = await response.json();
      setAllActions(allActions);

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      getUserAllActions(user.sub);
    }
  }, [isAuthenticated, user]); 

  
  useEffect(() => {
    console.log("DATA", allActions);
  }, [allActions]);

  function handleSelect (event) {

    const value = event.target.value;
    setSelectStatus(value)

    setActiveTab('books')
  }


  function getBookIdBySelectStatus(selectStatus, data){

    let shelf_status; 

    switch (selectStatus) {
      case "read":
        shelf_status = 0
      break;
      case "to-read":
        shelf_status = 1
      break;
      case "currently-reading":
        shelf_status = 2
      break;
    }
    
    const filteredData = data.filter((item) => item.shelf_status === shelf_status)
    
    const bookIds = filteredData.map(item => item.api_id)

    return bookIds
  }

  useEffect(() => {
    const ids = getBookIdBySelectStatus(selectStatus, allActions)
    setBookIds(ids)
  }, [selectStatus]);


  //Get specific book info
  async function getBookById() {
   
    try {

      const bookPromises = bookIds.map(async id => {

        const response = await fetch(`/api/${id}`);
        return await response.json();
      });
  
      // waits for all the fetch calls to resolve
      const booksDetails = await Promise.all(bookPromises);
      setFilteredBooks(booksDetails.flat()) //removes one level of nesting
  
    } catch (error) {
      console.error('Error fetching multiple books:', error);
    }
  }

  useEffect(() => {
   getBookById()
  }, [bookIds]);


  //implements the current changes to the page immediately
  function handleCommentUpdated(){
    getUserAllActions(user.sub);
  }
  function handleNoteUpdated(){
    getUserAllActions(user.sub);
  }

  

  return (
    <div>
      <p> {user && user.name}'s Page </p>

      <div className='bar-profile'>

        <SelectStatus value={selectStatus} onChange = {handleSelect}/>

        <p onClick={()=> setActiveTab('comments')}>Comments</p>
        <p onClick={()=> setActiveTab('notes')}>Notes</p>
        <button onClick={() => {setShow(true)}}>Add Note</button>
      </div>


      
      {
        (activeTab === 'books') &&
        filteredBooks.map((book) => {

          const action = allActions.find(action => action.api_id === book.api_id);
          
          const isFaved = action ? action.isfavorite : false;
          const status = action ? action.shelf_status : undefined;

          return (
            <BookCard 
              key={book.demo_api_id} 
              title={book.title}
              author={book.author}
              img={book.image_url}
              category={book.categories}
              id={book.api_id}
              faved={isFaved}
              status={status}
            />
          );
        })
      }


      {
        (activeTab === 'comments') &&
        allActions.filter((item) => { return item.comment_id !== null })
        .map((item, index) => (
          <CommentCard 
            key = {index}
            text = {item.text}
            //  get book name later.
            date = {item.date}
            rating={item.rate}
            icon = {true}
            commentId = {item.comment_id}
            onCommentUpdated={handleCommentUpdated}

          />
        ))
      }


      {
        (activeTab === 'notes') &&
        allActions.filter((item) => { return item.note !== null })
        .map((item, index) => (
          <NoteCard 
            key = {index}
            note = {item.note}
          />
        ))
      }
      

      {
        show && 
        <NotePopup 
          show={show}
          onClose={()=>setShow(false)}
          books = {filteredBooks}
          feeds = {allActions}
          noteUpdated={handleNoteUpdated}
        />
      }

    </div>
  )
}

