"use client";

import Heading from "@/components/Heading";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { LiaSortSolid } from "react-icons/lia";

const Testimonials = () => {
    const testimonialsData = [
        {
            name: "Alice Johnson",
            review: "The service was excellent and the staff was friendly. I would definitely recommend this place to my friends.",
            rating: 5,
        },
        {
            name: "Bob Smith",
            review: "The food was delicious, but the wait time was a bit long. Overall, a good experience.",
            rating: 4,
        },
        {
            name: "Catherine Lee",
            review: "I loved the ambiance and the decor. The menu had a great variety of options.",
            rating: 5,
        },
        {
            name: "David Brown",
            review: "The location is convenient and the prices are reasonable. I will visit again soon.",
            rating: 4,
        },
        {
            name: "Emily Davis",
            review: "The staff was attentive and the atmosphere was cozy. A perfect spot for a casual dinner.",
            rating: 5,
        },
        {
            name: "Frank Wilson",
            review: "The dessert was the highlight of the meal. I wish the main course was as impressive.",
            rating: 3,
        },
    ];

    const handleDeleteTestimonial = async (name) => {
        // TODO: Implement delete functionality
        console.log("Deleting testimonial for:", name);
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
                                                testimonial.name
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
        </div>
    );
};

export default Testimonials;
