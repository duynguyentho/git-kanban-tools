const axios = require("axios")
const { BACKLOG_CONFIG } = require('../configs/config')

const NulabAxios = axios.create({
    baseURL: `https://${process.env.NULAB_SPACE_ID}/api/v2`, // Set a base URL for the instance
    timeout: 5000,
    headers: { // Set default headers for requests
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer <your_access_token>'
    }
});

const getIssueType = async () => {
    try {
        const response = await NulabAxios.get(`/projects/${BACKLOG_CONFIG.PROJECT_ID}/issueTypes`)
        return response.data
    } catch (error) {
        console.log(`Failed API`, error)
        throw new Error(`Error getting issue types for project ${projectId}: ${error.message}`);
    }
}
