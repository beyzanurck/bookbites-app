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

        <div className="books-grid">

          {
            books.map((item, index) => (
              <BookCard 
                key = {index}
                title = {item.title}
                author = {item.author}
                img = {item.image_url}
                category = {item.categories}
              />
            ))
          }

        </div>
        
    </div>
  )
}
