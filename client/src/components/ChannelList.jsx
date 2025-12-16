export default function ChannelList({ channels, onSelect, activeChannel }) {
    return (
        <div className="w-56 bg-gray-900 text-gray-200 p-2 space-y-1">
            <h2 className="text-xs uppercase text-gray-400 mb-2">Channels</h2>

            {channels.map((ch) => (
                <div
                    key={ch._id}
                    onClick={() => onSelect(ch)}
                    className={`px-2 py-1 rounded cursor-pointer
            ${activeChannel?._id === ch._id
                            ? "bg-gray-700"
                            : "hover:bg-gray-800"
                        }`}
                >
                    # {ch.name}
                </div>
            ))}
        </div>
    );
}
