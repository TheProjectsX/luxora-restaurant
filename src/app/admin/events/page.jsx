"use client";

import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Events = () => {
    const [eventsData, setEventsData] = useState(null);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchEventsData = async () => {
            const response = await fetch("/api/events?limit=8");
            const data = await response.json();
            setEventsData(data.data);
            setPagination(data.pagination);
        };

        fetchEventsData();
    }, []);

    // Load More Data
    const handleLoadMore = async () => {
        const response = await fetch(
            `/api/events?limit=8&page=${pagination.current_page + 1}`
        );
        const data = await response.json();
        setEventsData((prev) => [...prev, ...data.data]);
        setPagination(data.pagination);
    };

    // Delete Event
    const handleDeleteEvent = async (event) => {
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

        const response = await fetch(`/api/admin/events/${event.id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setEventsData((prev) => prev.filter((e) => e.id !== event.id));
        } else {
            toast.error(data.error ?? "Failed to perform action");
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
                                        <p className="line-clamp-2 text-left">
                                            {event.name}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="line-clamp-2 text-left">
                                            {event.description}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-wrap">
                                        {event.date
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
                                        <p className="line-clamp-2 text-left">
                                            {event.location}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-wrap">
                                        {event.deadline
                                            ? new Date(event.deadline)
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
                                    <td className="px-6 py-4 flex flex-col items-center justify-center gap-1">
                                        <Link
                                            href={`/admin/events/new?edit=${event.id}`}
                                            className="text-blue-600 hover:underline underline-offset-2 cursor-pointer"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteEvent(event)
                                            }
                                            className="text-red-600 hover:underline underline-offset-2 cursor-pointer"
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

            {pagination?.has_next_page && (
                <div className="flex justify-center mt-6">
                    <Button
                        color={"dark"}
                        onClick={() => handleLoadMore()}
                        className="cursor-pointer"
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Events;
