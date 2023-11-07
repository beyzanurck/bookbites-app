import {React, useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import NotePopup from '../components/NotePopup';
import SelectStatus from '../components/SelectStatus';

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

  useEffect(() => {
    console.log("filtered books ", filteredBooks)
  }, [filteredBooks]);



  return (
    <div>
      <p> {user && user.name}'s Page </p>

      <div className='bar-profile'>

        <SelectStatus value={selectStatus} onChange = {handleSelect}/>

        <p>Comments</p>
        <p>Notes</p>
        <button onClick={() => {setShow(true)}}>Add Note</button>
      </div>


      {
        show && 
        <NotePopup 
            show = {show}
            onClose={() => {setShow(false)}}
        />
      }


    </div>
  )
}

