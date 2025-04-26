'use client'

import Config from '@/config'
import { useEffect } from 'react'

export default function StopSearch({ placeholder }) {
    useEffect(() => {
        var input = document.getElementById('searchInput')
        input.oninput = e => {
            fetch(
                '/api/places/?q='+input.value
            ).then(res => {
                res.json().then(json => {console.log(json)})
                // res.text().then(text => {
                //     console.log(text)
                // })
            })
        }
    })
    return (
        <div className="">
            <input id="searchInput" placeholder={placeholder}/>
        </div>
    )
}