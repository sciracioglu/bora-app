import axios from "axios";

const baseUrl = "http://localhost:1938/"
const baseUrl2 = "http://localhost:1980/"

const HttpGet = async (url) => {
    console.log(baseUrl)
    console.log(url)
    try {
        let response = await axios.get(baseUrl + url)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to get data from product service!")
    }
}

const HttpGet2 = async (url) => {
    console.log(baseUrl)
    console.log(url)
    try {
        let response = await axios.get(baseUrl2 + url)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to get data from user service!")
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

const HttpUpdate = async (url, data) =>{
    try{
        let response = await axios.put(baseUrl + url, data)

        return response
    } catch (err){
        console.log(err)
        throw new Error("Unable to update data to product service!")
    }
}

const HttpDelete = async (url, id) =>{
    try{
        let response = await axios.delete(baseUrl + url+`/${id}`)

        return response
    } catch (err){
        console.log(err)
        throw new Error(`Unable to product delete data!`)
    }
}

export {HttpGet, HttpGet2, HttpInsert, HttpUpdate, HttpDelete}