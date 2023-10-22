import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'

export default function Home() {

  const [books, setBooks] = useState([]);

  async function getBooks() {

    try {
      const response = await fetch("http://localhost:1212");

      const allBooks = await response.json();
      setBooks(allBooks);

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
        <h1>Beyza's Homepage</h1>

        <BookCard 
          title = {books[0] && books[0].title}
          author = {books[0] && books[0].author}
          img = {books[0] && books[0].image_url}
          category = {books[0] && books[0].categories}
        />
    </div>
  )
}
