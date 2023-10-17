import React from 'react'
import TagList from './TagList.jsx'
import "./Tags.css"
import { tagsList } from './taglist.js'

export default function Tags() {
    return (
        <>
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A tag is a keyword or label that categorizes your question with other,
                similar questions.</p>
            <p className='tags-p'>Using the right tags makes it easier for others to find and answer
                your question.</p>
            <div className='tags-list-container'>
                {
                    tagsList.map((tag, index) => (
                        <TagList tag={tag} key={index} />
                    ))
                }
            </div>
        </>
    )
}
