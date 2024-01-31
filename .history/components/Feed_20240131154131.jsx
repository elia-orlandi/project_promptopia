'use client'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [allPosts, setAllPosts] = useState([])

    // Search states
    const [searchText, setSearchText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [searchedResults, setSearchedResults] = useState([])

    
    const fetchPosts = async () => {
        const response = await fetch('/api/prompt')
        const data = await response.json()
        setAllPosts(data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const filterPosts = (filter) => {
        const regex = new RegExp(filter, 'i')

        return allPosts.filter(
            (item) => 
                regex.test(item.prompt) ||
                regex.test(item.tag) ||
                regex.test(item.creator.username)
        )
    }

    const handleSearchChange = (event) => {
        clearTimeout(searchTimeout)
        console.log(searchText)
        console.log(event.target.value)
        setSearchText(event.target.value)

        console.log(searchText)
        console.log(event.target.value)

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                setSearchedResults(filterPosts(event.target.value))
            }, 500)
        )
    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* All Prompts */}
            { searchText ? (
                <PromptCardList
                    data={searchedResults}
                    handleTagClick={() => { }}
                />
            ) : (
                <PromptCardList
                    data={allPosts}
                    handleTagClick={() => { }}
                />
            
            )}
        </section>
    )
}

export default Feed