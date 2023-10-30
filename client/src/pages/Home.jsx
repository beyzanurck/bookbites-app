import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState([]);
  const { isAuthenticated, user } = useAuth0();


  //gets all books
  async function getBooks() {

    try {
      const response = await fetch("/api/books");

      const allBooks = await response.json();
      setBooks(allBooks);

    } catch (error) {
      console.log(error.message)
    }
  }


  //gets the user's actions from feed table
  async function getActions(auth0_sub) {

    try {
      const response = await fetch(`/api/feed/${auth0_sub}`);

      const allActions = await response.json();
      setActions(allActions);

    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
   
    if(isAuthenticated){
      getActions(user.sub);
    }
  }, [isAuthenticated]);


  //finds the favorited books of the user
  function isFaved(api_id){
    
    const matchingAction = actions.find(element => element.api_id == api_id);

    if (matchingAction) {

      return matchingAction.isfavorite;
    }
    return false;
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  };
  

  return (
    <div>

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
                id = {item.api_id}
                faved = {isFaved(item.api_id)}
              />
            ))
          }

        </div>

    </div>
  )
}
