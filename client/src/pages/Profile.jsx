import {React, useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import NotePopup from '../components/NotePopup';
import SelectStatus from '../components/SelectStatus';

export default function Profile() {
  
  const { isAuthenticated, user } = useAuth0();
  const [show, setShow] = useState(false)
  const [allActions, setAllActions] = useState([])


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
    console.log(allActions);
  }, [allActions]);

  return (
    <div>
      <p> {user && user.name}'s Page </p>

      <div className='bar-profile'>
        <SelectStatus />
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
