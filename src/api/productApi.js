export const addProducts = async add => {
    const url = `http://localhost:5000/products`;
    
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(add)
    })
    const data = await res.json();
    return data;
}

export const getCategory = async () => {
    const url = `http://localhost:5000/category/`

    try {
        const response = await fetch(url);
        const category = response.json()
        console.log(category);
        return category;
    } catch (error) {
        console.error(error);
    }
}