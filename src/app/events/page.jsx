"use client";

import Heading from "@/components/Heading";
import React from "react";
import dynamic from "next/dynamic";
import { IoLocation, IoCalendar } from "react-icons/io5";
import Link from "next/link";

const Countdown = dynamic(() => import("react-countdown"), {
    ssr: false,
});

const Event = () => {
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
        <div className="space-y-10">
            {eventsData.map((event, idx) => (
                <section key={idx}>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                        <Heading>{event.name}</Heading>
                        {event.deadline && (
                            <Countdown
                                date={new Date(event.deadline).getTime()}
                                renderer={({
                                    days,
                                    hours,
                                    minutes,
                                    seconds,
                                }) => (
                                    <div className="flex items-center justify-center gap-4 text-center">
                                        {[
                                            { label: "Days", value: days },
                                            { label: "Hours", value: hours },
                                            {
                                                label: "Minutes",
                                                value: minutes,
                                            },
                                            {
                                                label: "Seconds",
                                                value: seconds,
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white shadow-md rounded-xl px-4 py-2 w-20"
                                            >
                                                <div className="text-xl font-bold text-gray-800">
                                                    {item.value}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        )}
                        <span></span>
                    </div>

                    <div
                        className="w-full aspect-[2/1] lg:aspect-[3/1] bg-cover bg-center bg-no-repeat relative"
                        style={{ backgroundImage: `url(${event.banner})` }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>

                        <div className="absolute sm:bottom-14 sm:left-8 max-sm:inset-0 max-sm:w-full max-sm:h-full flex items-center justify-center mx-auto max-w-sm sm:max-w-md">
                            <div className="flex flex-col max-sm:items-center max-sm:justify-center gap-2">
                                <h3 className="text-white text-2xl font-bold">
                                    {event.name}
                                </h3>
                                <p className="text-white text-sm line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="flex items-center gap-5 mb-4">
                                    <p className="text-white text-sm flex items-center gap-2">
                                        <IoLocation />
                                        {event.location}
                                    </p>
                                    <p className="text-white text-sm flex items-center gap-2">
                                        <IoCalendar />
                                        {new Date(event.date).toLocaleString(
                                            "en-US",
                                            {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={"/book"}
                                        className="bg-white text-black px-4 py-2 rounded-md"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Event;
