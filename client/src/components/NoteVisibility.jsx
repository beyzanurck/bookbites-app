import React from 'react'

export default function NoteVisibility({onChange}) {
  return (
    <div>
        <input type="radio" value="false" name="isNotePrivate" onChange={onChange}/> Public
        <input type="radio" value="true" name="isNotePrivate" onChange={onChange}/> Private
    </div>
  )
}
