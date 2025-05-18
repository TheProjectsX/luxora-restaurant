"use client";

import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import ShowMessage from "./ShowMessage";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ReactHead } from "@/components/ReactHead";

const Messages = () => {
    const [messagesData, setMessagesData] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch("/api/admin/messages");
            const data = await response.json();
            setMessagesData(data.data);
        };

        fetchMessages();
    }, []);

    // Delete Message
    const handleDeleteMessage = async (message) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!isConfirmed) return;

        const response = await fetch(`/api/admin/messages/${message.id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
            toast.success(data.message);
            setMessagesData((prev) =>
                prev.filter((msg) => msg.id !== message.id)
            );
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div>
            <ReactHead>
                <title>Messages - Admin Dashboard</title>
                <meta
                    name="description"
                    content="Manage messages from customers of Luxora Restaurant."
                />
            </ReactHead>

            <ShowMessage
                message={selectedMessage}
                closeModal={() => setSelectedMessage(null)}
            />
            <div className="mb-6 pt-4 w-fit flex items-center gap-5">
                <Heading>Messages</Heading>
                <Spinner light size="md" hidden />
            </div>

            {!messagesData && <LoadingPlaceholder />}

            {messagesData && messagesData.length === 0 && (
                <EmptyLabel>No messages found</EmptyLabel>
            )}

            {/* Table */}
            {messagesData && messagesData.length > 0 && (
                <div className="relative overflow-x-auto scrollbar-thin shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-xs text-center text-gray-600">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Message</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {messagesData.map((message, idx) => (
                                <tr
                                    key={idx}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                    onClick={(e) => {
                                        if (
                                            e.target === e.currentTarget ||
                                            e.target.tagName === "TD"
                                        ) {
                                            setSelectedMessage(message);
                                        }
                                    }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:underline underline-offset-2">
                                        {message.name}
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer hover:underline underline-offset-2">
                                        {message.email}
                                    </td>
                                    <td className="px-6 py-4 text-left max-w-md cursor-pointer hover:underline underline-offset-2">
                                        <p className="line-clamp-2">
                                            {message.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:underline underline-offset-2">
                                        {new Date(
                                            message.createdAt
                                        ).toLocaleString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-4 space-y-1 flex flex-col items-center">
                                        <button
                                            className="px-6 text-blue-600 hover:underline underline-offset-4 whitespace-nowrap decoration-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline"
                                            onClick={() =>
                                                handleReplyMessage(
                                                    message.email
                                                )
                                            }
                                            title="Reply is not available yet"
                                            disabled
                                        >
                                            Reply
                                        </button>
                                        <button
                                            className="px-6 text-red-600 hover:underline underline-offset-4 whitespace-nowrap decoration-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline"
                                            onClick={() =>
                                                handleDeleteMessage(message)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Messages;
