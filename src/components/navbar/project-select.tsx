import React from 'react';
import { useSelect } from 'downshift';
import {
  projectsList,
  projectItem,
  projectItemHighlighted,
  projectTitle,
  projectDescription,
  arrowDropdownButton,
  projectLink,
  projectItemText,
  projectSelectWrap,
  projectsListTitle,
  projectSelectLabel,
  projectVersion,
} from './navbar.css';

import iconInteractors from '../../img/icon-interactors.svg';
import iconEffection from '../../img/icon-effection.svg';
import iconBigtest from '../../img/icon-bigtest.svg';
import iconSimulacrum from '../../img/icon-simulacrum.svg';

import DropdownArrow from './dropdown-arrow';

const items = [
  {
    title: 'Interactors',
    description: 'Page Objects for components libraries',
    url: 'https://frontside.com/interactors',
    version: 'v1',
    img: iconInteractors,
  },
  {
    title: 'Effection',
    description: 'Structured Concurrency for JavaScript',
    url: 'https://frontside.com/effection',
    version: 'v2',
    img: iconEffection,
  },
  {
    title: 'Auth0 Simulator',
    description: 'Enabling testing and local development',
    url: 'https://github.com/thefrontside/simulacrum/tree/v0/packages/auth0',
    version: 'v0',
    img: iconSimulacrum,
  },
  {
    title: 'Bigtest',
    description: 'Universal test runner, GraphQL driven',
    url: 'https://frontside.com/bigtest',
    version: 'v0',
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
      <label className={projectSelectLabel} {...getLabelProps()}>
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
        {isOpen && (
          <>
            <li>
              <h4 className={projectsListTitle}>Open Source Projects</h4>
            </li>
            {items.map((item, index) => (
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
                    <span className={projectTitle}>
                      {item.title}
                      <span className={projectVersion}>{item.version}</span>
                    </span>
                    <span className={projectDescription}>
                      {item.description}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
export default ProjectSelect;
