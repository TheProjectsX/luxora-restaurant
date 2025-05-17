"use client";

import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CTAButton } from "@/components/Buttons";
import Heading from "@/components/Heading";
import { LuVegan } from "react-icons/lu";
import { PiPepperFill } from "react-icons/pi";
import Ratings from "@/components/Ratings";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

const Home = () => {
    const [dishes, setDishes] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            const response = await fetch("/api/menu");
            const data = await response.json();
            setDishes(data.data.slice(0, 3));
        };

        fetchDishes();
    }, []);

    return (
        <div>
            {/* Hero Section */}

            <section className="relative">
                <Carousel
                    animationHandler="fade"
                    infiniteLoop
                    autoPlay
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    useKeyboardArrows={false}
                    showThumbs={false}
                    interval={3500}
                    transitionTime={1000}
                    className="rounded-2xl overflow-hidden"
                >
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="relative aspect-[2/1] md:aspect-[5/2]"
                        >
                            <img
                                src={`/images/hero-background-${(idx + 1)
                                    .toString()
                                    .padStart(2, "0")}.jpg`}
                                alt="Banner Image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="absolute inset-0 flex flex-col items-center justify-center h-full text-white bg-black/50 rounded-2xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold animate-bounce font-inter text-center">
                        Where Taste Meets Luxury!
                    </h1>
                </div>
            </section>

            <div className="mx-4 pb-10 mb-10 border-b-2 border-gray-200 border-dashed"></div>

            {/* Featured Dishes Slider */}
            <section className="">
                <Heading className="mb-6">Featured Dishes</Heading>

                {!dishes && (
                    <div className="flex items-center justify-center h-96">
                        <LoadingPlaceholder />
                    </div>
                )}

                {dishes && (
                    <Carousel
                        infiniteLoop
                        autoPlay
                        showArrows
                        showThumbs={false}
                        interval={3000}
                        className="rounded-2xl overflow-hidden"
                    >
                        {dishes.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative h-96 w-full bg-center bg-cover bg-no-repeat flex items-end justify-center"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                }}
                            >
                                <div className=" flex flex-col justify-center text-center bg-black/30 w-full h-full sm:h-auto text-white py-6 px-4">
                                    <h2 className="text-2xl font-bold mb-3 flex items-start justify-center gap-2">
                                        {item.name}{" "}
                                        <span className="text-base text-slate-100 font-normal">
                                            ({item.price}) ৳
                                        </span>
                                    </h2>
                                    <div className="text-sm md:text-base text-white whitespace-pre-line line-clamp-3 sm:line-clamp-5 md:line-clamp-none mb-5">
                                        {item.description}
                                    </div>

                                    <div className="flex items-center justify-center gap-2 bg-white rounded-full py-2 px-4 w-fit mx-auto">
                                        <LuVegan
                                            className={
                                                item.isVegan
                                                    ? "text-green-500"
                                                    : "text-black"
                                            }
                                        />

                                        <span className="flex items-center gap-1">
                                            <Ratings
                                                count={5}
                                                rating={item.spicyLevel}
                                                className="text-red-500"
                                            >
                                                <PiPepperFill className="text-green-500" />
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
            </section>

            <div className="mx-4 pb-10 mb-10 border-b-2 border-gray-200 border-dashed"></div>

            {/* Google Map Section */}
            <section className="w-full aspect-[2/1]">
                <Heading>Find Us on Google Map</Heading>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5005.050661979085!2d90.39087053844055!3d23.73361171521127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e90a449e4f%3A0xb7092a9c25197fa4!2sUniversity%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1747234595244!5m2!1sen!2sbd"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    );
};

export default Home;
