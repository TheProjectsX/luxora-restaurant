"use client";

import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";

const Events = () => {
    const [eventsData, setEventsData] = useState(null);

    useEffect(() => {
        const fetchEventsData = async () => {
            const response = await fetch("/api/admin/events");
            const data = await response.json();
            setEventsData(data.data);
        };

        fetchEventsData();
    }, []);

    const handleDeleteEvent = async (event) => {
        const response = await fetch(`/api/admin/events/${event.id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Event deleted successfully");
        } else {
            toast.error("Failed to delete event");
        }
    };

    return (
        <div>
            <div className="flex items-center gap-5 mb-6">
                <Heading>Events</Heading>
                <Link
                    href="/admin/events/new"
                    className="text-primary-600 hover:underline underline-offset-4"
                >
                    Add New
                </Link>
            </div>

            {!eventsData && <LoadingPlaceholder />}

            {eventsData && eventsData.length === 0 && (
                <EmptyLabel>No events to show</EmptyLabel>
            )}

            {eventsData && eventsData.length > 0 && (
                <div className="relative overflow-x-auto scrollbar-thin shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-xs text-center text-gray-600">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Deadline</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventsData.map((event, idx) => (
                                <tr
                                    key={idx}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                        {event.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="line-clamp-2 text-left">
                                            {event.description}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-wrap">
                                        {new Date(event.date)
                                            .toLocaleString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })
                                            .split(", ")
                                            .join("\n")}
                                    </td>
                                    <td className="px-6 py-4">
                                        {event.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-wrap">
                                        {event.deadline
                                            ? new Date(event.date)
                                                  .toLocaleString("en-US", {
                                                      hour: "numeric",
                                                      minute: "numeric",
                                                      hour12: true,
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                      year: "numeric",
                                                  })
                                                  .split(", ")
                                                  .join("\n")
                                            : "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleUpdateEvent(event)
                                                }
                                                className="text-blue-600 hover:underline"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteEvent(
                                                        event.name
                                                    )
                                                }
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default Events;
