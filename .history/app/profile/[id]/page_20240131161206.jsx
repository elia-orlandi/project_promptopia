'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = ({params}) => {

    const { data: session } = useSession()

    const [posts, setPosts] = useState([])

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const fetchUser = async () => {

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session.user.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        if (session?.user.id) {
            fetchPosts()
        }
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })
                
                const newPosts = posts.filter((p) => p._id !== post._id)
                setPosts(newPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name=""
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile