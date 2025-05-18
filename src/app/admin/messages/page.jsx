"use client";

import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import ShowMessage from "./ShowMessage";

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

    return (
        <div>
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
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200 [&_td]:not-last:cursor-pointer hover:[&_td]:not-last:underline"
                                    onClick={(e) => {
                                        if (
                                            e.target === e.currentTarget ||
                                            e.target.tagName === "TD"
                                        ) {
                                            setSelectedMessage(message);
                                        }
                                    }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {message.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.email}
                                    </td>
                                    <td className="px-6 py-4 text-left max-w-md">
                                        <p className="line-clamp-2">
                                            {message.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
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
                                            className="px-6 text-blue-600 hover:underline underline-offset-4 whitespace-nowrap decoration-none cursor-pointer"
                                            onClick={() =>
                                                handleReplyMessage(
                                                    message.email
                                                )
                                            }
                                        >
                                            Reply
                                        </button>
                                        <button
                                            className="px-6 text-red-600 hover:underline underline-offset-4 whitespace-nowrap decoration-none cursor-pointer"
                                            onClick={() =>
                                                handleDeleteMessage(idx)
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
