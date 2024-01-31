import React from 'react'

function Form({ type, post, setPost, submitting, handleSubmit }) {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1>{type} Post</h1>
        </section>
    )
}

export default Form