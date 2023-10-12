import * as React from "react";
import { projectArrow } from "./navbar.css";

function SvgComponent(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={7.21} className={projectArrow[(props.isOpen ? 'open' : 'closed')]}>
      <path
        d="M5.4.61q-.75.75-1.47 1.53c-.46.53-1 1-1.4 1.6A27.54 27.54 0 000 7.21a28.64 28.64 0 003.47-2.54c.55-.44 1.06-.93 1.6-1.4l.09-.09 1-.53.71.54.09.08c.54.47 1.05 1 1.6 1.4A26.65 26.65 0 0012 7.21a27.54 27.54 0 00-2.53-3.47c-.45-.56-.94-1.07-1.4-1.6s-1-1-1.47-1.53L6 0z"
      />
    </svg>
  )
}

export default SvgComponent
