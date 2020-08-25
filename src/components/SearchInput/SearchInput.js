import React from "react";
import './SearchInput.css'

export default function SearchInput({placeholder, onSearchSubmit, onSearchChange, buttonText }) {
  return (
    <div className="search-container">
      <form onSubmit={onSearchSubmit}>
        <input placeholder={placeholder} onChange={onSearchChange} type="search" name="search" className="search-input" />
        <button className="search-button">{buttonText}</button>
      </form>
    </div>
  );
}
