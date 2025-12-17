import api from "./api"

export const getManga = async () => {
    const res = await api.get("/mangalist/")
    console.log(res)
    return res.data
}