"use client"

import React from 'react'
import { useState } from 'react';
import { Search } from 'lucide-react';


export const SearchBar = ({ className = "" }) => {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        console.log(input);
        setInput("");
    }

  return (
        <div className={`search-bar ${className}`}>
            <input 
                type="search" 
                className="search-input" 
                placeholder="Search here..." 
                onChange={(event) => setInput(event.target.value)}
                tabIndex="0" />
            <button 
                className="search-submit" 
                tabIndex="0"
                onClick={handleSearch}>
                <Search className='h-6 w-6'/>
            </button>
        </div>
  )
}
