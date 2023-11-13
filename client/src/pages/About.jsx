import React from 'react'
import about from '../assets/about.png'
import '../styles/About.css'

export default function About() {
  return (
    <div className='about-page'>
      <img 
          style={{ width: '256px', height: '256px', borderRadius: '2%', marginBottom: '2%'}} 
          src={about}
        />
      <h2>About the App</h2>
      <p>BookBites is a user-friendly website designed for book lovers. It allows you to discover great books, write reviews, and rate them. More importantly, it offers a unique feature where you can take personal notes about each book. You can record where you were while reading, who you were with, how you felt, or even how you relate to certain characters.</p>
    </div>
  )
}
