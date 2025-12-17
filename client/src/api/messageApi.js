import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getChannelMessages = async (serverId, channelId, token) => {
    try {
        const res = await axios.get(
            `${API_URL}/api/messages/${serverId}/${channelId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};
