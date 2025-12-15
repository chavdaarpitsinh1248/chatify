import { useReducer } from "react";
import { chatReducer, initialState } from "../chatReducer";

export default function useChat() {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    return { state, dispatch };
}