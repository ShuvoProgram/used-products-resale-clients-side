import axios from "axios";

export const getImageUrl = image => {
    const formData = new FormData()
    formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`

    axios.post(url, formData).then(data => {
        console.log(data)
        return data
    })
};