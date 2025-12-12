export default function ChatInput() {
    return (
        <div className="p-4 border-t bg-white flex gap-2">
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Send
            </button>
        </div>
    );
}