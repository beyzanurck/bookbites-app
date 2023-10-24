import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';

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

      <div className='top'>

        <div className='book-img'>
            <img src={book[0] && book[0].image_url}/>
            <MdFavorite size={32} style={{ color: 'red' }} />
            <MdFavoriteBorder size={32}/>

            <select>
                <option value="read">Read</option>
                <option value="to-read">To Read</option>
                <option value="currently-reading">Currently Reading</option>
            </select>
        </div>

    
        <div className='book-details'>
            <p>{book[0] && book[0].title}</p>
            <p>{book[0] && book[0].description}</p>
        </div>

      </div>
     
    </div>
  )
}
