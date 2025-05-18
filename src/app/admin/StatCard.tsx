import { IconType } from "react-icons";

const StatCard = ({
    Icon,
    label,
    value,
}: {
    Icon: IconType;
    label: string;
    value: string | number;
}) => (
    <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
        <Icon className="text-blue-600 text-3xl" />
        <div>
            <div className="text-xl font-bold text-gray-800 h-7 flex items-center">
                {value.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    </div>
);

export default StatCard;
