import React from 'react'

export default function TextArea({placeholder, name, value, onChange}) {
  return (
    <textarea  
        placeholder = {`${placeholder} here...`}
        name = {name}
        value={value}
        rows="10" 
        cols="60" 
        onChange={onChange}
    />
  )
}
