import React from "react";
import { MdClose } from "react-icons/md";

const ShowMessage = ({
    message,
    closeModal,
}: {
    message: {
        name: string;
        email: string;
        message: string;
        createdAt: string;
    } | null;
    closeModal: () => void;
}) => {
    if (!message) return null;

    return (
        <dialog
            className="absolute inset-0 h-full w-full bg-black/50 z-10 flex items-center justify-center"
            open={!!message}
            onClose={closeModal}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeModal();
                }
            }}
        >
            <div className="relative bg-white p-6 rounded-xl max-w-xl">
                <button
                    className="absolute top-0.5 right-0.5 text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                    onClick={closeModal}
                >
                    <MdClose className="w-5 h-5" />
                </button>
                <div className="text-center font-medium text-lg mb-4 sm:w-3/4 mx-auto">
                    {message.message}
                </div>

                <div className="flex items-center justify-center">
                    <h3 className="text-lg font-medium">{message.name}</h3>
                    <span className="pr-2 mr-2 border-r h-4 border-gray-500"></span>
                    <p className="text-gray-500">{message.email}</p>
                </div>
            </div>
        </dialog>
    );
};

export default ShowMessage;
