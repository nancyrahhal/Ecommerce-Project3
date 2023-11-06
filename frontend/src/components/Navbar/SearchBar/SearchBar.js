import React from 'react'
import "./SearchBar.css"

const  Search =() => {
  return (
    <div className="search">
        <input className="searchInput"></input>
        <button className="searchButton" id=""> Search </button>
    </div>
  )
}

export default Search;