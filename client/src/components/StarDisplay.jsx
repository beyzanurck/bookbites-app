import React from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';

export default function StarDisplay({ rating, totalStars = 5 }) {

    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < rating) {
        stars.push(<BsStarFill key={i} style={{ color: 'gold' }} />);
      } else {
        stars.push(<BsStar key={i} style={{ color: 'grey' }} />);
      }
    }

  return (
    <div>
      {stars}
    </div>
  )
}
