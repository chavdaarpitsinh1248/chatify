export const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

export const formatDate = (date) =>
    new Date(date).toDateString();