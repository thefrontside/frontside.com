import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useInView } from 'react-hook-inview';
import { useReduceMotion } from 'react-reduce-motion';

export default function Animation({ src, className = undefined }) {
  const [ref, isVisible] = useInView({
    threshold: 0.2,
  });

  const [lotty, setLotty] = useState(null);

  const reduceMotion = useReduceMotion();

  useEffect(() => {
    if (!!lotty && isVisible) {
      lotty.play();
    }
    if (!!lotty && !isVisible) {
      lotty.pause();
    }
  }, [lotty, isVisible]);

  console.info(reduceMotion)

  return (
    <div ref={ref} className={className}>
      <Player
        lottieRef={(instance) => setLotty(instance)}
        src={src}
        speed={reduceMotion ? 0.5 : 1}
        autoplay
        loop
      />
    </div>
  );
}
