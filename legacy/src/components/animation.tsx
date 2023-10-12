import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useInView } from 'react-hook-inview';

const NORMAL_SPEED = 1;
const REDUCED_SPEED = 0.5;

export default function Animation({
  src,
  className = undefined,
  speed = NORMAL_SPEED,
  blockedView = false,
}) {
  const [ref, isVisible] = useInView({
    threshold: 0.2,
  });

  const [lotty, setLotty] = useState(null);

  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!!lotty) {
      if (isVisible && !blockedView) {
        lotty.play();
      } else {
        lotty.pause();
      }
    }
  }, [lotty, isVisible, blockedView]);

  useEffect(() => {
    if (!!lotty) {
      lotty.setSpeed(reducedMotion ? speed * REDUCED_SPEED : speed);
    }
  }, [reducedMotion]);

  return (
    <div ref={ref} className={className}>
      <Player
        lottieRef={(instance) => setLotty(instance)}
        src={src}
        speed={reducedMotion ? speed * REDUCED_SPEED : speed}
        loop
      />
    </div>
  );
}

// From: https://www.joshwcomeau.com/react/prefers-reduced-motion/#the-hook
const QUERY = '(prefers-reduced-motion: no-preference)';
function usePrefersReducedMotion() {
  // Default to no-animations, since we don't know what the
  // user's preference is on the server.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    // Set the true initial value, now that we're on the client:
    setPrefersReducedMotion(!window.matchMedia(QUERY).matches);
    // Register our event listener
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);
  return prefersReducedMotion;
}
