import React from "react";

export default function Testimonial({ children, portrait, name }) {
  return (
    <blockquote>
      {children}
      <img src={portrait} alt={`Portait of ${name}`} />
      {name}
    </blockquote>
  );
}
