import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

export default function Book() {

    const [book, setBook] = useState([]);

    let { id } = useParams();

    async function getBookById() {
        try {

            const response = await fetch(`http://localhost:1212/${id}`);

            const theBook = await response.json()

            setBook(theBook)

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBookById();
    }, []);

  return (
    <div>
      <p>Book Page</p>
      <img src={book[0] && book[0].image_url}/>
    </div>
  )
}
