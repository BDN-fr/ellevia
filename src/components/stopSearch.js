'use client'

import call from '@/components/api'
import { useEffect } from 'react'

export default function StopSearch({ placeholder }) {
    useEffect(() => {
        var input = document.getElementById('searchInput')
        input.oninput = e => {
            var val = input.value
            setTimeout(() => {
                if (val != input.value) {return}
                call('GET', 'places/?q='+input.value).then(res => {
                    console.log(res)
                })
            }, 1000)
        }
    })
    return (
        <div>
            <input id="searchInput" placeholder={placeholder}/>
        </div>
    )
}