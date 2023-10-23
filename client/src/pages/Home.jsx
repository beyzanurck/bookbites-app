import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'

export default function Home() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  };

  return (
    <div>
        <h1>Beyza's Homepage</h1>

        <input
          placeholder="search a book by title/author"
          type='text'
          value={search}
          onChange={handleSearchChange}
        />

        <div className="books-grid">

          {
            books.filter((item) => {

              if(!search) { //empty str is falsy(false). !false => true
                return true
              }

              return (
                item.title.toLowerCase().includes(search.toLowerCase()) || 
                item.author.toLowerCase().includes(search.toLowerCase())
              )
            })
            .map((item, index) => (
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
