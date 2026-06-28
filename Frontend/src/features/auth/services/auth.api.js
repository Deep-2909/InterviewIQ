import axios from "axios";


export async function register({ username, email, password }) {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/register",
            {
                username,
                email,
                password
            },
            { withCredentials: true }
        )

        return response.data
    }
    catch (error) {
        console.log(error);
        return { error: error.response?.data?.message || error.response?.data?.Message || error.message };
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/login",
            {
                email,
                password
            },
            { withCredentials: true }
        )

        return response.data;
    }
    catch (err) {
        console.log(err);
        return { error: err.response?.data?.message || err.response?.data?.Message || err.message };
    }
}

export async function logout() {
    try {
        const response = await axios.get("http://localhost:3000/api/auth/logout",
            { withCredentials: true }
        )

        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function getMe() {
    try {
        const response = await axios.get("http://localhost:3000/api/auth/get-me",
            { withCredentials: true }
        )

        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}