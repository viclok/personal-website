import { dev } from '$app/environment';
import { SECRET_GEMINI_KEY } from '$env/static/private';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(SECRET_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const actions = {
    default: async (event:any): Promise<{suggestions: String}> => {
        const data = await event.request.formData();
        const goal = data.get('user_goal');
        const energy = data.get('energy');

        const prompt = "My goal is to " + goal + ". On a scale of 1-10 my energy level is " + energy 
            + ". Can you suggest me three activities to help me achieve my goal that match my energy level."
            + " Can you please format the response so that each suggestion is separated by an @ symbol";
        const result = await model.generateContent(prompt);
        // console.log(result.response);
        return { suggestions: result.response.text()}
    }
}






// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;
