export default function ChannelList({ channels = [], onSelect, activeChannel }) {
    return (
        <div className="w-56 bg-gray-900 text-gray-200 p-2 space-y-1">
            <h2 className="text-xs uppercase text-gray-400 mb-2">Channels</h2>

            {channels.length === 0 && (
                <p className="text-xs text-gray-500 px-2">
                    No channels yet
                </p>
            )}

            {channels.map((ch, index) => {
                const id = ch._id || index;

                return (
                    <button
                        key={id}
                        onClick={() => onSelect(ch)}
                        className={`w-full text-left px-2 py-1 rounded cursor-pointer
                        ${activeChannel?._id === ch._id
                                ? "bg-gray-700"
                                : "hover:bg-gray-800"
                            }`}
                    >
                        # {ch.name}
                    </button>
                );
            })}
        </div>
    );
}
