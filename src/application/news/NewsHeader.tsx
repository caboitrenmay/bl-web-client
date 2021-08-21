import React from 'react';
import { Rss } from '../../domain';
import './NewsPage.css';

interface HeaderPropsType {
  currentSource: string;
  results: Rss[];
  selected: string;
  handleClick: (rss: Rss) => void;
}

interface TabPropsType {
  rss: Rss;
  isSelected: boolean;
  handleClick: (rss: Rss) => void;
}

function Tab(props: TabPropsType) {
  return (
    <li
      className={props.isSelected ? 'nav-item active' : 'nav-item'}
      onClick={() => props.handleClick(props.rss)}
    >
      <a
        className="nav-link"
        href="#"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        {props.rss.name}{' '}
        {props.isSelected ? <span className="sr-only">(current)</span> : null}
      </a>
    </li>
  );
}

export function Header({
  currentSource,
  selected,
  results,
  handleClick,
}: HeaderPropsType) {
  console.log('selected: ', selected);

  const Item = results.map(value => (
    <Tab
      key={value.id}
      rss={value}
      isSelected={selected === value.link}
      handleClick={handleClick}
    />
  ));

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top active">
        <a
          className="navbar-brand"
          href="#"
          data-toggle="modal"
          data-target="#sourceModal"
        >
          <span className="badge badge-primary">
            {currentSource === '' ? 'Báo Lướt' : currentSource}
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">{Item}</ul>
        </div>
      </nav>
    </header>
  );
}
