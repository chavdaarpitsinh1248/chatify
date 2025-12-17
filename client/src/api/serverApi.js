import axios from "axios";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/servers`;

export const createServer = async (name, token) => {
    try {
        const res = await axios.post(
            API,
            { name },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const getServers = async (token) => {
    try {
        const res = await axios.get(API, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
