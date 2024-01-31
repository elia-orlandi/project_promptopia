import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB()
        console.log(req.nextUrl.searchParams.get('searchText'))
        const searchText = req.nextUrl.searchParams.get('searchText')
        let findRequest = {}

        if (searchText) {
            findRequest = { prompt: searchText, tag: searchText, creator: { username: searchText }}
        }

        const prompts = await Prompt.find(findRequest).populate('creator')

        console.log(prompts)

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}