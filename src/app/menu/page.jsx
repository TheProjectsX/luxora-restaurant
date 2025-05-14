"use client";

import { Button, Select, TextInput } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { PiPepperFill } from "react-icons/pi";
import { LuVegan } from "react-icons/lu";
import React from "react";
import Ratings from "@/components/Ratings";

const Menu = () => {
    const dishData = [
        {
            name: "Spicy Thai Basil Chicken",
            description:
                "Stir-fried chicken with Thai basil, chili, and garlic in a savory sauce",
            price: 500, // Adjusted to max price in Taka
            category: "MAIN_COURSE",
            isVegan: false,
            spicyLevel: "MEDIUM",
            image: "https://placehold.co/600x400",
        },
        {
            name: "Vegan Quinoa Salad",
            description:
                "A refreshing salad with quinoa, cherry tomatoes, cucumber, and a lemon vinaigrette",
            price: 450, // Adjusted to max price in Taka
            category: "SALAD",
            isVegan: true,
            spicyLevel: "NONE",
            image: "https://placehold.co/600x400",
        },
        {
            name: "Classic Margherita Pizza",
            description:
                "Traditional pizza with fresh mozzarella, tomatoes, and basil",
            price: 500, // Adjusted to max price in Taka
            category: "MAIN_COURSE",
            isVegan: false,
            spicyLevel: "NONE",
            image: "https://placehold.co/600x400",
        },
        {
            name: "Chocolate Lava Cake",
            description:
                "Rich chocolate cake with a gooey molten center, served with vanilla ice cream",
            price: 400, // Adjusted to max price in Taka
            category: "DESSERT",
            isVegan: false,
            spicyLevel: "NONE",
            image: "https://placehold.co/600x400",
        },
        {
            name: "Mango Smoothie",
            description:
                "A creamy smoothie made with fresh mangoes and a hint of coconut milk",
            price: 300, // Adjusted to max price in Taka
            category: "DRINK",
            isVegan: true,
            spicyLevel: "NONE",
            image: "https://placehold.co/600x400",
        },
        {
            name: "Spicy Tuna Roll",
            description:
                "Sushi roll with spicy tuna, avocado, and cucumber, topped with spicy mayo",
            price: 500, // Adjusted to max price in Taka
            category: "APPETIZER",
            isVegan: false,
            spicyLevel: "HIGH",
            image: "https://placehold.co/600x400",
        },
    ];

    return (
        <div className="space-y-10">
            {/* Filter Items */}
            <section className="flex items-center justify-center gap-2 sm:gap-4">
                <h3 className="text-2xl font-bold hidden sm:block">Filter:</h3>
                <div className="w-56 sm:w-80">
                    <TextInput
                        type="search"
                        icon={IoSearchOutline}
                        placeholder="Search for dishes"
                        className="w-full"
                        required
                    />
                </div>
                <div className="min-w-24 sm:w-40">
                    <Select>
                        <option value="all">All</option>
                        <option value="starters">Starters</option>
                        <option value="mains">Mains</option>
                        <option value="desserts">Desserts</option>
                        <option value="drinks">Drinks</option>
                        <option value="vegan">Vegan</option>
                        <option value="seasonal">Seasonal</option>
                    </Select>
                </div>
            </section>

            {/* Results */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dishData.map((item, idx) => (
                    <div
                        key={idx}
                        className="w-full rounded-2xl shadow-xl bg-white max-w-96 mx-auto"
                    >
                        <div className="aspect-[3/2] rounded-t-2xl overflow-hidden mb-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                            />
                        </div>
                        <div className="px-3 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.name}
                                </h5>

                                {item.isVegan && (
                                    <span
                                        className="text-green-500"
                                        title="Vegan"
                                    >
                                        <LuVegan />
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-700 dark:text-gray-400 text-sm mb-2.5 line-clamp-2">
                                {item.description}
                            </p>

                            <p className="text-gray-700 dark:text-gray-400 mb-2">
                                Price:{" "}
                                <span className="font-bold">৳{item.price}</span>
                            </p>

                            <div className="flex items-center gap-2">
                                <p className="text-gray-700 dark:text-gray-400">
                                    Spice Level:
                                </p>
                                <p>
                                    <span className="flex items-center gap-1">
                                        <Ratings
                                            count={5}
                                            rating={
                                                item.spicyLevel === "NONE"
                                                    ? 0
                                                    : item.spicyLevel ===
                                                      "MEDIUM"
                                                    ? 3
                                                    : 5
                                            }
                                            className="text-red-500"
                                        >
                                            <PiPepperFill className="text-green-500" />
                                        </Ratings>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <div className="flex items-center justify-center">
                <button className="bg-slate-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all duration-300 cursor-pointer hover:bg-slate-900">
                    Load More
                </button>
            </div>
        </div>
    );
};

export default Menu;
