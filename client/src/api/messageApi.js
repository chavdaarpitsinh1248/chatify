import axios from "axios";

export const getChannelMessages = (serverId, channelId, token) =>
    axios.get(
        `http://localhost:5000/api/messages/${serverId}/${channelId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );