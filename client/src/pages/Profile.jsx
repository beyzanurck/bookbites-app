import {React, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import NotePopup from '../components/NotePopup';

export default function Profile() {
  
  const { user } = useAuth0();
  const [show, setShow] = useState(false)

  return (
    <div>
      <p> {user && user.name}'s Page </p>

      <button onClick={() => {setShow(true)}}>Add Note</button>

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
