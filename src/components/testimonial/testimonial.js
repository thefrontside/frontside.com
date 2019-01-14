import React from "react";
import Text from "../text";

export default function Testimonial({ children, portrait, name }) {
  return (
    <blockquote>
      <Text tag="p">{children}</Text>
      <img src={portrait} alt={`Portait of ${name}`} />
      {name}
    </blockquote>
  );
}
