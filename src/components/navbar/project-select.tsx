import React from 'react';
import { useSelect } from 'downshift';
import {
  projectsList,
  projectItem,
  projectItemHighlighted,
  projectTitle,
  projectDescription,
  arrowDropdownButton,
  navLink,
  projectLink,
  projectItemText,
  projectSelectWrap,
} from './navbar.css';

import iconInteractors from '../../img/icon-interactors.svg';
import iconEffection from '../../img/icon-effection.svg';
import iconBigtest from '../../img/icon-bigtest.svg';

import DropdownArrow from './dropdown-arrow';

const items = [
  {
    title: 'Interactors',
    description: 'Page Objects for components libraries',
    url: 'https://frontside.com/interactors',
    img: iconInteractors,
  },
  {
    title: 'Effection',
    description: 'Structured Concurrency for JavaScript',
    url: 'https://frontside.com/effection',
    img: iconEffection,
  },
  {
    title: 'Bigtest',
    description: 'Universal test runner using GraphQL',
    url: 'https://frontside.com/bigtest',
    img: iconBigtest,
  },
];

function ProjectSelect() {
  let {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items, itemToString: (item) => item.title });
  return (
    <div className={projectSelectWrap}>
      <label className={navLink} {...getLabelProps()}>
        Open Source
      </label>
      <button
        type="button"
        className={arrowDropdownButton}
        {...getToggleButtonProps()}
      >
        <DropdownArrow isOpen={isOpen} />
      </button>
      <ul className={projectsList} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item}${index}`}
              className={
                highlightedIndex === index
                  ? projectItemHighlighted
                  : projectItem
              }
              {...getItemProps({ item, index })}
            >
              <a href={item.url} target="_blank" className={projectLink}>
                <img src={item.img} alt="" />
                <span className={projectItemText}>
                  <span className={projectTitle}>{item.title}</span>
                  <span className={projectDescription}>{item.description}</span>
                </span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ProjectSelect;
