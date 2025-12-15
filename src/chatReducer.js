export const initialState = {
    messages: [
        {
            id: 1,
            text: "Hi! 👋 Welcome to Chatify",
            sender: "bot",
            timestamp: new Date(),
        },
    ],
};

export function chatReducer(state, action) {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        case "BOT_REPLY":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        default: return state;
    }
}