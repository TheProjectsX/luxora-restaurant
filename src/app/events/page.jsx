"use client";

import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IoLocation, IoCalendar } from "react-icons/io5";
import Link from "next/link";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";

const Countdown = dynamic(() => import("react-countdown"), {
    ssr: false,
});

const Event = () => {
    const [eventsData, setEventsData] = useState(null);

    useEffect(() => {
        const fetchEventsData = async () => {
            const response = await fetch("/api/events");
            const data = await response.json();
            setEventsData(data.data);
        };

        fetchEventsData();
    }, []);
    return (
        <div className="space-y-10">
            {!eventsData && <LoadingPlaceholder />}

            {eventsData && eventsData.length === 0 && (
                <>
                    <Heading>Events</Heading>
                    <EmptyLabel>No events to show</EmptyLabel>
                </>
            )}

            {eventsData &&
                eventsData.length > 0 &&
                eventsData.map((event, idx) => (
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
                                                {
                                                    label: "Hours",
                                                    value: hours,
                                                },
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
                                            {new Date(
                                                event.date
                                            ).toLocaleString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
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
