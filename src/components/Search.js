import React from "react";

/* Text box, drop down menu and search button */
const Search = ({ setInputText, query, setQuery }) => {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return(
        <form>
            <input onChange={inputTextHandler} type="text" className="search-bar"/>
            <div className="menu">
                <select name="categories" className="categories">
                    <option value="all">All</option>
                    <option value="continue this">Continue this</option>
                </select>
            </div>
            <button onClick={submitHandler} className="search-button" type="submit">
            <span className="material-icons">search</span>
            </button>
        </form>
    );
};

export default Search;
