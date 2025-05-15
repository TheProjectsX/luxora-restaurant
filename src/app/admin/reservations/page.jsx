"use client";

import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
const Reservations = () => {
    const [reservationsData, setReservationsData] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            const response = await fetch("/api/admin/reservations");
            const data = await response.json();
            setReservationsData(data.data);
        };

        fetchReservations();
    }, []);

    return (
        <div>
            <div className="mb-6 pt-4 w-fit flex items-center gap-5">
                <Heading>Reservations</Heading>
                <Spinner light size="md" hidden />
            </div>

            {!reservationsData && <LoadingPlaceholder />}

            {reservationsData && reservationsData.length === 0 && (
                <EmptyLabel>No reservations found</EmptyLabel>
            )}

            {/* Table */}
            {reservationsData && reservationsData.length > 0 && (
                <div className="relative overflow-x-auto scrollbar-thin shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-xs text-center text-gray-600">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="justify-center">Date & Time</th>
                                <th className="px-6 py-3">Guests</th>
                                <th className="justify-center">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservationsData.map((reservation, idx) => (
                                <tr
                                    key={idx}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                >
                                    <td className="px-6 py-4">
                                        {reservation.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {reservation.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {reservation.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(
                                            reservation.date
                                        ).toLocaleString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        {reservation.guests}
                                    </td>
                                    <td className="px-6 py-4">
                                        {reservation.status === "confirmed" ? (
                                            <div className="flex items-center justify-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                                                Confirmed
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>
                                                Pending
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <button
                                            className={`${
                                                reservation.status ===
                                                "confirmed"
                                                    ? "text-red-600"
                                                    : "text-green-600"
                                            } hover:underline whitespace-nowrap`}
                                            onClick={() =>
                                                handleChangeReservationStatus(
                                                    reservation.id,
                                                    reservation.status ===
                                                        "confirmed"
                                                        ? "pending"
                                                        : "confirmed"
                                                )
                                            }
                                        >
                                            {reservation.status === "confirmed"
                                                ? "Cancel Reservation"
                                                : "Confirm Reservation"}
                                        </button>
                                        <button
                                            className="text-blue-600 hover:underline whitespace-nowrap ml-2"
                                            onClick={() =>
                                                handleDeleteReservation(
                                                    reservation.id
                                                )
                                            }
                                        >
                                            Delete Reservation
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

export default Reservations;
