'use client'

import './placeSearch.css'

import call from '@/components/api'
import { useEffect, useState } from 'react'

function Suggestion({ place }) {
    return (
        <button className='suggestion'>{place.name}</button>
    )
}

export default function PlaceSearch({ placeholder }) {
    var [suggestions, setSuggestions] = useState([])

    function addSuggestions(places) {
        if (places.length == 0) {
            places.push({name:'Aucun résultat', error:true})
        }
        setSuggestions(places)
    }
    function clearSuggestions() {
        setSuggestions([])
    }

    useEffect(() => {

    })
    return (
        <div className='place-search'>
            <input className="search-input"
            placeholder={placeholder}
            onInput={e => {
                clearSuggestions()
                var val = e.target.value
                setTimeout(() => {
                    if (val != e.target.value) {return}
                    if (e.target.value.replaceAll(' ', '') == '') {return}
                    call('GET', 'places/?q='+e.target.value).then(res => {
                        addSuggestions(res.places)
                    })
                }, 500)
            }}
            />
            <div className="suggestions">
                {suggestions.map((place, i) => {return <Suggestion key={i} place={place}/>})}
            </div>
        </div>
    )
}