import {useEffect, useState} from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export default function StarRating({ totalStars = 5 }) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    // Function to determine the type of star to render
    const renderStarIcon = (starIndex) => {
        if (hover >= starIndex) {
            return <BsStarFill />;
        } else if (!hover && rating >= starIndex) {
            return <BsStarFill />;
        } else if (!hover && rating + 0.5 >= starIndex) {
            return <BsStarHalf />;
        } else {
            return <BsStar />;
        }
    };

    useEffect(()=> {
        console.log("rating value", rating)
    },[rating])

  return (
    <div>
         {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={starValue}
                        className={`star ${starValue <= (hover || rating) ? 'on' : 'off'}`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        {renderStarIcon(starValue)}
                    </button>
                );
            })}
    </div>
  )
}



