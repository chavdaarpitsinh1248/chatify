import axios from "axios";

const API = "http://localhost:5000/api/servers";

export const createServer = (name, token) =>
    axios.post(API, { name }, { headers: { Authorization: `Bearer ${token}` } })

export const getServers = (token) =>
    axios.get(API, { headers: { Authorization: `Bearer ${token}` } });