import axios from "axios";
import { config } from 'dotenv';
config()

export const NulabAxios = axios.create({
    baseURL: `https://${process.env.NULAB_SPACE_ID}.backlog.com/api/v2`, // Set a base URL for the instance
    timeout: 5000,
    params: {
        apiKey: process.env.API_KEY
    },
    headers: { // Set default headers for requests
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export const getIssueType = async () => {
    try {
        const response = await NulabAxios.get(`/projects/${process.env.PROJECT_ID}/issueTypes`)
        return response.data
    } catch (error) {
        console.log(`Failed API`, error)
        throw new Error(`Error getting issue types for project `);
    }
}

