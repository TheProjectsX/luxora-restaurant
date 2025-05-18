import { IconType } from "react-icons";

const StatCard = ({
    Icon,
    label,
    value,
}: {
    Icon: IconType;
    label: string;
    value: React.ReactNode | null;
}) => {
    const loader = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34.67"
            height="8"
            viewBox="0 44 52 12"
        >
            <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1.2s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1"
                />
            </circle>
            <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1.2s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2"
                />
            </circle>
            <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1.2s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3"
                />
            </circle>
        </svg>
    );

    return (
        <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
            <Icon className="text-blue-600 text-3xl" />
            <div>
                <div className="text-xl font-bold text-gray-800 h-7 flex items-center">
                    {value?.toString().padStart(2, "0") ?? loader}
                </div>
                <div className="text-sm text-gray-500">{label}</div>
            </div>
        </div>
    );
};

export default StatCard;
