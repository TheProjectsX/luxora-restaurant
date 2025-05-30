"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Heading from "@/components/Heading";
import Ratings from "@/components/Ratings";
import { Blockquote } from "flowbite-react";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { CTAButton } from "@/components/Buttons";
import { ReactHead } from "@/components/ReactHead";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await fetch("/api/testimonials");
            const data = await response.json();
            setTestimonials(data.data);
        };

        fetchTestimonials();
    }, []);

    return (
        <div>
            <ReactHead>
                <title>Testimonials - Luxora Restaurant</title>
                <meta
                    name="description"
                    content="Read what our customers say about Luxora Restaurant."
                />
            </ReactHead>

            <Heading className="mx-auto mb-8">Testimonials</Heading>

            {!testimonials && <LoadingPlaceholder />}

            {testimonials && testimonials.length === 0 && (
                <EmptyLabel>No testimonials to show</EmptyLabel>
            )}

            {testimonials && testimonials.length > 0 && (
                <Carousel
                    infiniteLoop
                    autoPlay
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
                                    "{item.review}"
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
            )}

            <div className="flex justify-center gap-4 pt-8">
                <CTAButton
                    href="/menu"
                    className="flex-1 md:flex-initial md:w-1/3 "
                >
                    Explore Menu
                </CTAButton>
                <CTAButton
                    href="/book"
                    className="flex-1 md:flex-initial md:w-1/3 "
                >
                    Book Table
                </CTAButton>
            </div>
        </div>
    );
};

export default Testimonials;
