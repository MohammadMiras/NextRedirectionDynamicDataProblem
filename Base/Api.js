import axios from "axios"

const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE
})
export async function get(url) {
    const start = new Date()
    console.log(`Getting ${process.env.NEXT_PUBLIC_API_BASE}${url} ...`)
    return await
        axiosApi.get(url, { crossDomain: true }).then(response => {

            const end = new Date()
            console.log(`Took ${end - start} milliseconds for ${process.env.NEXT_PUBLIC_API_BASE}${url}`)
            return response.data

        }).catch(error => {
            return { statusCode: error?.response?.status ?? 500 }
        })
}
