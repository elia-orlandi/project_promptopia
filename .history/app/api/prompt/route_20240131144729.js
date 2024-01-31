import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectToDB()
        console.log(req.nextUrl.searchParams.get('searchText'))
        const searchText = req.nextUrl.searchParams.get('searchText')
        let prompts = []

        if (searchText) {
            const searchTextCaseInsensitive = new RegExp(searchText, 'i')

            prompts = await Prompt.find(
                { $or: [{ prompt: searchTextCaseInsensitive }, { tag: searchTextCaseInsensitive }, {'creator.username': searchTextCaseInsensitive}] })
                .populate('creator')
        } else {
            prompts = await Prompt.find().populate('creator')
        }

        console.log(prompts)

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}