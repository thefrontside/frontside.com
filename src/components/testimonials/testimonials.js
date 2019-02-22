import React from 'react'
import PropTypes from 'prop-types'

import './testimonials.css';

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.node.isRequired,
      author: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired
    })
  ).isRequired
};

export default function Testimonials({ testimonials }) {
  return (
    <ul className="testimonials">
      {testimonials.map((testimonial, i) => (
        <li key={i} className="testimonial">
          <img src={testimonial.img} alt={testimonial.author}/>
          <blockquote>
            {testimonial.quote}
            <cite>{testimonial.author}</cite>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
