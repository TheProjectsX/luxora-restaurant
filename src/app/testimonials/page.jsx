"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Heading from "@/components/Heading";
import Ratings from "@/components/Ratings";
import { Blockquote } from "flowbite-react";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            message:
                "Absolutely amazing dining experience! The food was exquisite and the service was impeccable. The ambiance was perfect for our anniversary dinner. Will definitely be coming back!",
            rating: 5,
        },
        {
            name: "Michael Chen",
            message:
                "Great restaurant with authentic flavors. The chef's special was outstanding. Only giving 4 stars because the wait time was a bit long, but the food made up for it.",
            rating: 4,
        },
        {
            name: "Emma Rodriguez",
            message:
                "Loved the atmosphere and the staff was very friendly. The wine selection was impressive. The dessert menu is to die for!",
            rating: 5,
        },
        {
            name: "David Thompson",
            message:
                "Decent food but a bit pricey for the portion sizes. The service was good though, and the location is convenient.",
            rating: 3,
        },
        {
            name: "Lisa Patel",
            message:
                "The vegetarian options were fantastic! As someone who's always looking for good plant-based meals, I was pleasantly surprised by the variety and creativity of the dishes.",
            rating: 5,
        },
    ];

    return (
        <div>
            <Heading className="mx-auto mb-8">Testimonials</Heading>

            <Carousel
                infiniteLoop
                autoPlay={false}
                showArrows
                showThumbs={false}
                interval={3000}
                className="rounded-2xl overflow-hidden mb-8"
            >
                {testimonials.map((item, idx) => (
                    <div
                        key={idx}
                        className="relative w-full bg-slate-100 px-4 h-48 flex items-center"
                    >
                        <div className="max-w-lg mx-auto">
                            <Blockquote className="text-base text-center mb-3">
                                "{item.message}"
                            </Blockquote>

                            <div className="flex justify-center items-center">
                                <h3 className="text-lg font-medium font-inter">
                                    {item.name}
                                </h3>
                                <span className="pr-2 mr-2 border-r h-4 border-gray-500"></span>
                                <span className="flex items-center gap-0.5">
                                    <Ratings
                                        count={5}
                                        rating={item.rating}
                                        element={
                                            <FaStar className="text-yellow-300" />
                                        }
                                    >
                                        <FaRegStar className="text-yellow-300" />
                                    </Ratings>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Testimonials;
