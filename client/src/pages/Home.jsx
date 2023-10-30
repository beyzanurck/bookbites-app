import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState([]);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  async function getBooks() {

    try {
      const response = await fetch("/api/books");

      const allBooks = await response.json();
      setBooks(allBooks);

    } catch (error) {
      console.log(error.message)
    }
  }
  async function getActions(auth0_sub) {

    try {
      const response = await fetch(`/api/feed/${auth0_sub}`);

      const allActions = await response.json();
      setActions(allActions);
      console.log(allActions)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    console.log("Main page, user logged", isAuthenticated, user)
    if(isAuthenticated){
      getActions(user.sub);
    }
  }, [isAuthenticated]);

  function isFaved(api_id){
    console.log("is faved", api_id, actions)
    const matchingAction = actions.find(element => element.api_id == api_id);
    if (matchingAction) {
      console.log("is faved match", matchingAction)
      return matchingAction.isfavorite;
    }
    return false;
  }

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
                id = {item.api_id}
                faved = {isFaved(item.api_id)}
              />
            ))
          }

        </div>

    </div>
  )
}
