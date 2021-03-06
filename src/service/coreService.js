import axios from "axios";

const baseUrl = "http://localhost:1938/"
const baseUrl2 = "http://localhost:1980/"


const UrlEnum = {
    productUrl: "http://localhost:1938/",
    userUrl: "http://localhost:1980/"
}

const HttpGlobalGet = async (root, url) => {
    try {
        let response = await axios.get(root + url)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to get data from product service!")
    }
}

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

const HttpInsert2 = async (url, data) => {
    try {
        let response = await axios.post(baseUrl2 + url, data)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to post data to user service!")
    }
}

const HttpUpdate = async (url, data) => {
    try {
        let response = await axios.put(baseUrl + url, data)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to update data to product service!")
    }
}

const HttpUpdate2 = async (url, data) => {
    try {
        let response = await axios.put(baseUrl2 + url, data)

        return response
    } catch (err) {
        console.log(err)
        throw new Error("Unable to update data to user service!")
    }
}

const HttpDelete = async (url, id) => {
    try {
        let response = await axios.delete(baseUrl + url + `/${id}`)

        return response
    } catch (err) {
        console.log(err)
        throw new Error(`Unable to product delete data!`)
    }
}
const HttpDelete2 = async (url, id) => {
    try {
        let response = await axios.delete(baseUrl2 + url + `/${id}`)

        return response
    } catch (err) {
        console.log(err)
        throw new Error(`Unable to product delete user!`)
    }
}

const Compare = (a, b) => {
    console.log(a.price)
    if (a.price && b.price) {
        const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ""));
        const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ""));
        return aPrice - bPrice
    }
}

export {
    HttpGet,
    HttpGet2,
    HttpInsert,
    HttpUpdate,
    HttpUpdate2,
    HttpDelete,
    HttpInsert2,
    HttpDelete2,
    Compare,
    HttpGlobalGet,
    UrlEnum
}