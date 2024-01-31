'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfile = ({params}) => {

    const [posts, setPosts] = useState([])
    const searchParams = useSearchParams()
    const profileName = searchParams.get('name')
    const userId = params.id

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        if (userId) {
            fetchPosts()
        }
    }, [])

    return (
        <Profile
            name={profileName}
            desc={`Welcome to ${profileName}'s personalized profile page. Explore ${profileName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
    )
}

export default UserProfile