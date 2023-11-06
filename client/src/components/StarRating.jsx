import {useEffect, useState} from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export default function StarRating({ rating, onRating, totalStars = 5, text }) {

    const [hover, setHover] = useState(0);

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
                    onClick={() => onRating(starValue)} 
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(rating)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    disabled={!text} 
                >
                    {renderStarIcon(starValue)}
                </button>
            );
        })}
    </div>
  )
}



