export default function ChatHeader({ users = [] }) {
    return (
        <div className="p-4 border-b bg-white sticky top-0 z-10">
            <h1 className="text-lg font-semibold">Chatify</h1>
            <p className="text-sm text-gray-500 truncate">
                Online: {users.join(", ")}
            </p>
        </div>
    );
}
