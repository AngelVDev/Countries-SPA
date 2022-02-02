import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getCountry } from '../actions/index'


const SearchBar = () => {
    let dispatch = useDispatch()
    let [name, setName] = useState('')
    let handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getCountry(name))
    }
    return (
        <div>
            <input
                type='text'
                placeholder='TTry searching a country, pal'
                onChange={e => handleInputChange(e)}
            />
            <button type='submit' onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
    }
    export default SearchBar;