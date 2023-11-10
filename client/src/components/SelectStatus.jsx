import React from 'react'

export default function SelectStatus({ value, onChange }) {
  return (
    <div>

        <select value={value} onChange={onChange}>
            <option value="" disabled> select a status</option>
            <option value="read">Read</option>
            <option value="to-read">To Read</option>
            <option value="currently-reading">Currently Reading</option>
        </select>
      
    </div>
  )
}
