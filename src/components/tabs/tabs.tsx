// Gatsby doesn't include the recommended exceptions to this rule
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md#rule-details

import React, {
  useContext,
  createContext,
  useState,
  useRef,
  useCallback,
} from 'react';

import { useId } from '../../utils/hooks/use-id';
import { tabsList, tabButton, tabPane, tabsListNav, tabsTitle } from './tabs.css';

function elementIsNullOrString(child) {
  return !child || typeof child.type === 'string';
}

const TabContext = createContext({});

const TabList = ({ children, title, _id }) => {
  const { activeTab } = useContext(TabContext);
  return (
    <nav className={tabsListNav}>
      <h2 className={tabsTitle}>{title}</h2>
      <ul role="tablist" className={tabsList}>
        {React.Children.map(children, (child, index) => {
          if (elementIsNullOrString(child)) return child;
          return React.cloneElement(child, {
            _id: `${_id}__${index}`,
            active: activeTab === index,
            index,
            tab: true,
          });
        })}
      </ul>
    </nav>
  );
};

export const Tab = ({ _id, label, active, index, tab, children }) => {
  const { setActiveTab, tabList } = useContext(TabContext);
  const buttonRef = useCallback((ref) => tabList.push(ref), [tabList]);

  const onKeyDown = (e) => {
    let nextButton;
    switch (e.which) {
      case 35: // end
        e.preventDefault();
        tabList[tabList.length - 1].focus();
        break;
      case 36: // home
        e.preventDefault();
        tabList[0].focus();
        break;
      case 37: // left
        e.preventDefault();
        nextButton = tabList[index - 1] || tabList[tabList.length - 1];
        nextButton.focus();
        break;
      case 39: // right
        e.preventDefault();
        nextButton = tabList[index + 1] || tabList[0];
        nextButton.focus();
        break;
      default:
    }
  };

  if (tab) {
    return (
      <li role="presentation">
        <button
          ref={buttonRef}
          onKeyDown={onKeyDown}
          onClick={() => setActiveTab(index)}
          onFocus={() => setActiveTab(index)}
          type="button"
          role="tab"
          id={`${_id}--tab`}
          tabIndex={!active ? '-1' : '0'}
          aria-selected={active || undefined}
          className={tabButton}
        >
          {label}
        </button>
      </li>
    );
  }

  return (
    <section
      hidden={!active}
      role="tabpanel"
      id={`${_id}--panel`}
      aria-labelledby={`${_id}--tab`}
      className={tabPane}
    >
      {children}
    </section>
  );
};

export const Tabs = (props) => {
  const tabList = useRef([]);
  const [activeTab, setActiveTab] = useState(0);
  const id = useId('tabs');

  return (
    <TabContext.Provider
      value={{ setActiveTab, activeTab, tabList: tabList.current }}
    >
      <TabList _id={id} title={props.title}>
        {props.children}
      </TabList>
      {React.Children.map(props.children, (child, index) => {
        if (elementIsNullOrString(child)) return child;
        return React.cloneElement(child, {
          _id: `${id}__${index}`,
          active: activeTab === index,
          index,
        });
      })}
    </TabContext.Provider>
  );
};

Tabs.displayName = 'Tabs';
