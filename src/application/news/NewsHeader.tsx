import React from 'react';
import { urlTitle } from '../../domain';
import './NewsPage.css';

interface HeaderPropsType {
  indexSelected: number;
  handleClick: (indexSelected: number) => void;
}

export function Header({ indexSelected, handleClick }: HeaderPropsType) {
  console.log('index selected: ', indexSelected);

  const Item = urlTitle.map((value, index) => (
    <li
      key={index}
      className={indexSelected === index ? 'nav-item active' : 'nav-item'}
      onClick={() => handleClick(index)}
    >
      <a
        className="nav-link"
        href="#"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        {value}{' '}
        {indexSelected === index ? (
          <span className="sr-only">(current)</span>
        ) : null}
      </a>
    </li>
  ));

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top active">
        <a className="navbar-brand" href="#">
          Báo Lướt
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
