import React from 'react'

export default function BlogItem(props) {
    return (
        <li>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
        </li>
    )
}
