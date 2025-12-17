export const initialState = {
    messages: [
        {
            id: "welcome",
            text: "Hi! 👋 Welcome to Chatify",
            sender: "bot",
            timestamp: new Date().toISOString(),
        },
    ],
    botTyping: false,
};

export function chatReducer(state, action) {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        case "SET_BOT_TYPING":
            return {
                ...state,
                botTyping: action.payload,
            };

        default:
            return state;
    }
}
