"use client";

import EmptyLabel from "@/components/EmptyLabel";
import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Testimonials = () => {
    const [testimonialsData, setTestimonialsData] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await fetch("/api/testimonials");
            const data = await response.json();
            setTestimonialsData(data.data);
        };

        fetchTestimonials();
    }, []);

    const handleDeleteTestimonial = async (testimonial) => {
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
            `/api/admin/testimonials/${testimonial.id}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setTestimonialsData((prev) =>
                prev.filter((item) => item.id !== testimonial.id)
            );
        } else {
            toast.error(data.error ?? "Failed to delete testimonial");
        }
    };

    return (
        <div>
            <div className="flex items-center gap-5 mb-6">
                <Heading>Testimonials</Heading>
                <Link
                    href="/admin/testimonials/new"
                    className="text-primary-600 hover:underline underline-offset-4"
                >
                    Add New
                </Link>
            </div>

            {!testimonialsData && <LoadingPlaceholder />}

            {testimonialsData && testimonialsData.length === 0 && (
                <EmptyLabel>No testimonials found</EmptyLabel>
            )}

            {testimonialsData && testimonialsData.length > 0 && (
                <div className="relative overflow-x-auto scrollbar-thin shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-xs text-center text-gray-600">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Review</th>
                                <th className="justify-center">Rating</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonialsData.map((testimonial, idx) => (
                                <tr
                                    key={idx}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                        {testimonial.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="line-clamp-1 text-left">
                                            {testimonial.review}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {testimonial.rating}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                handleDeleteTestimonial(
                                                    testimonial
                                                )
                                            }
                                            className="text-red-600 hover:underline"
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

export default Testimonials;
