"use client";

import React, { useEffect, useState } from "react";

import HeroBackground from "@/assets/images/hero-background.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CTAButton } from "@/components/Buttons";
import Heading from "@/components/Heading";

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
            <section
                className="relative bg-cover bg-center aspect-[2/1] md:aspect-[5/2] rounded-3xl overflow-hidden"
                style={{
                    backgroundImage: `url(${HeroBackground.src})`,
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-white">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold animate-bounce font-inter text-center">
                        Where Taste Meets Luxury!
                    </h1>
                </div>
            </section>

            <div className="mx-4 pb-10 mb-10 border-b-2 border-gray-200 border-dashed"></div>

            {/* Featured Dishes Slider */}
            <section className="">
                <Heading className="mb-6">Featured Dishes</Heading>

                {dishes && (
                    <Carousel
                        infiniteLoop
                        autoPlay
                        showArrows
                        showThumbs={false}
                        interval={3000}
                        className="rounded-2xl overflow-hidden mb-8"
                    >
                        {dishes.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative h-96 w-full md:flex items-center justify-between"
                            >
                                <div className="flex-1/2 h-full bg-gray-400">
                                    <img
                                        src={item.image}
                                        alt="Dish Image"
                                        className="object-cover h-full w-full object-center"
                                    />
                                </div>
                                <div className="absolute inset-0 md:static flex-1/2 h-full bg-gray-200/50 md:bg-gray-200 md:text-left py-8 px-8 md:px-4 flex flex-col justify-center">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {item.name}
                                    </h2>
                                    <div className="text-sm md:text-base text-gray-600 whitespace-pre-line line-clamp-3 sm:line-clamp-5 md:line-clamp-none">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                )}

                <div className="flex justify-center gap-4">
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
