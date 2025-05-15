"use client";

import Heading from "@/components/Heading";
import React from "react";
import Link from "next/link";

const Events = () => {
    const eventsData = [
        {
            name: "Wine Night",
            description:
                "Join us for an exclusive evening of fine wines and gourmet pairings. Experience a curated selection of premium wines from around the world.",
            date: "2025-07-15T18:00:00Z",
            location: "Luxora Main Dining Hall",
            banner: "https://placehold.co/1200x400/FFD700/000000?text=Wine+Night",
            deadline: "2025-05-21T23:59:59Z",
        },
        {
            name: "Chef's Table",
            description:
                "An intimate dining experience with our head chef. Limited to 8 guests, enjoy a specially crafted menu with wine pairings.",
            date: "2025-06-20T19:00:00Z",
            location: "Private Dining Room",
            banner: "https://placehold.co/1200x400/8B0000/FFFFFF?text=Chef%27s+Table",
        },
        {
            name: "Italian Cooking Masterclass",
            description:
                "Learn authentic Italian cooking techniques from our master chef. Hands-on experience with fresh ingredients and traditional recipes.",
            date: "2025-08-05T14:00:00Z",
            location: "Luxora Cooking Studio",
            banner: "https://placehold.co/1200x400/228B22/FFFFFF?text=Italian+Cooking+Masterclass",
            deadline: "2025-05-20T23:59:59Z",
        },
        {
            name: "Jazz Night",
            description:
                "Enjoy an evening of smooth jazz while savoring our signature cocktails and appetizers. Featuring local jazz ensemble.",
            date: "2025-07-27T20:00:00Z",
            location: "Luxora Lounge",
            banner: "https://placehold.co/1200x400/4B0082/FFFFFF?text=Jazz+Night",
        },
        {
            name: "Seafood Festival",
            description:
                "Celebrate the bounty of the sea with our special seafood festival. Fresh catches, innovative preparations, and ocean-inspired cocktails.",
            date: "2025-08-12T17:00:00Z",
            location: "Luxora Outdoor Terrace",
            banner: "https://placehold.co/1200x400/00CED1/000000?text=Seafood+Festival",
        },
    ];

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
                                <td className="px-6 py-4">{event.location}</td>
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
                                                handleDeleteEvent(event.name)
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
        </div>
    );
};

export default Events;
