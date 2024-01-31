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

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setAllPosts(data)
        }
        fetchPosts()
    }, [])

    const filterPosts = (searchText) => {
        const regex = new RegExp(searchText, 'i')

        return allPosts.filter((item) => regex.test(item.prompt) || regex.test(item.tag || regex.test(item.creator.username))
    }

    const handleSearchChange = (event) => {
        clearTimeout(setsearchTimeout)
        setSearchText(event.target.value)

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                setSearchedResults(filterPosts(searchText))
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

            <PromptCardList
                data={searchedResults.length > 0 ? searchedResults : allPosts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed