import axios from "axios"
export const post = async (URL, DATA, token) => {
    try {
        const response = await axios.post('http://localhost:5000/' + URL + '',
            JSON.stringify(DATA),
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                }
            }
        );
        return response.data
    } catch (error) {
        return 'error'
    }
}

export const get = async (URL, token) => {
    try {
        const response = await axios.get('http://localhost:5000/' + URL + '', {
            headers: {
                authorization: token,
            }
        });
        return response.data
    } catch (error) {
        return 'error'
    }
}
