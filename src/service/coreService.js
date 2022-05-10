import axios from "axios";

const baseUrl = "http://localhost:1978/"

const HttpGet = async (url) => {
    try {
        let response = await axios.get(baseUrl + url)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to get data from product service!")
    }
}

const HttpInsert = async (url, data) => {
    try {
        let response = await axios.post(baseUrl + url, data)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to post data to product service!")
    }
}

export {HttpGet, HttpInsert}