import React from 'react'

export default function TextArea({placeholder, name, value, onChange, disabled}) {
  return (
    <textarea  
        placeholder = {`${placeholder} here...`}
        name = {name}
        value={value}
        rows="9" 
        onChange={onChange}
        disabled = {disabled}
        style={{width: '100%'}}
    />
  )
}
