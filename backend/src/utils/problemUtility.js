require('dotenv').config();
const axios = require("axios");

const getFileNameByLanguage = (language) => {
    const files  = {
        "cpp":"main.cpp",
        "java" : "main.java",
        "python" : "main.py"

    }
    return files[language.toLowerCase()];

}

const submitBatch = async(submissions) => {
    const options = {
  method: 'POST',
  url: process.env.RAPID_API_URL,
  headers: {
    'x-rapidapi-key': process.env.RAPID_API_KEY,
    'x-rapidapi-host': process.env.RAPID_API_HOST,
    'Content-Type': 'application/json'
  },
  data: submissions
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

return await fetchData();
}

module.exports = {getFileNameByLanguage,submitBatch};