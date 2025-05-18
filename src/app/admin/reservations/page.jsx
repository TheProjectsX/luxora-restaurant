"use client";

import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ReactHead } from "@/components/ReactHead";

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

    const handleConfirmReservation = async (reservation) => {
        const { isConfirmed } = await Swal.fire({
            title: "Confirm Reservation?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!",
        });

        if (!isConfirmed) return;

        const response = await fetch(
            `/api/admin/reservations/${reservation.id}/confirm`,
            {
                method: "PUT",
            }
        );

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setReservationsData((prev) =>
                prev.map((item) =>
                    item.id === reservation.id
                        ? { ...item, status: "confirmed" }
                        : item
                )
            );
        } else {
            toast.error(data.error ?? "Failed to change reservation status");
        }
    };

    // Delete Reservation
    const handleDeleteReservation = async (reservation) => {
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

        const response = await fetch(
            `/api/admin/reservations/${reservation.id}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setReservationsData((prev) =>
                prev.filter((item) => item.id !== reservation.id)
            );
        } else {
            toast.error(data.error ?? "Failed to delete reservation");
        }
    };

    return (
        <div>
            <ReactHead>
                <title>Reservations - Admin Dashboard</title>
                <meta
                    name="description"
                    content="Manage reservations at Luxora Restaurant."
                />
            </ReactHead>

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
                                    <td className="px-6 py-4 whitespace-nowrap">
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
                                    <td className="px-6 py-4 flex flex-col gap-1 items-center">
                                        <button
                                            className={`${
                                                reservation.status ===
                                                "confirmed"
                                                    ? "text-gray-600"
                                                    : "text-blue-600"
                                            } hover:underline whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:hover:no-underline`}
                                            onClick={() =>
                                                handleConfirmReservation(
                                                    reservation
                                                )
                                            }
                                            disabled={
                                                reservation.status ===
                                                "confirmed"
                                            }
                                        >
                                            {reservation.status === "confirmed"
                                                ? "Reservation Confirmed"
                                                : "Confirm Reservation"}
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:hover:no-underline"
                                            onClick={() =>
                                                handleDeleteReservation(
                                                    reservation
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
