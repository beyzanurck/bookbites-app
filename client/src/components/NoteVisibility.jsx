import React from 'react'
import '../styles/Profile.css'

export default function NoteVisibility({onChange}) {
  return (
    <div>
        <input style={{marginLeft: '5px'}} type="radio" value="false" name="isNotePrivate" onChange={onChange}/> Public
        <input style={{marginLeft: '5px'}} type="radio" value="true" name="isNotePrivate" onChange={onChange}/> Private
    </div>
  )
}
