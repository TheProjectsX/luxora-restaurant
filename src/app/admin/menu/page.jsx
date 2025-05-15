"use client";

import Heading from "@/components/Heading";
import React from "react";
import Link from "next/link";

const Menu = () => {
    const menuData = [
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
        <div>
            <div className="flex items-center gap-5 mb-6">
                <Heading>Menu</Heading>
                <Link
                    href="/admin/menu/new"
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
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Vegan</th>
                            <th className="px-6 py-3">Spicy Level</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuData.map((item, idx) => (
                            <tr
                                key={idx}
                                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium whitespace-nowrap">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    <p className="line-clamp-2 text-left">
                                        {item.description}
                                    </p>
                                </td>
                                <td className="px-6 py-4">৳{item.price}</td>
                                <td className="px-6 py-4">
                                    {item.category.replace("_", " ")}
                                </td>
                                <td className="px-6 py-4">
                                    {item.isVegan ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4">{item.spicyLevel}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleUpdateMenuItem(item)
                                            }
                                            className="text-blue-600 hover:underline"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteMenuItem(item.name)
                                            }
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Menu;
