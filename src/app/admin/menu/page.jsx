"use client";

import Heading from "@/components/Heading";
import React, { useState } from "react";
import Link from "next/link";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";

const Menu = () => {
    const [menuData, setMenuData] = useState(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            const response = await fetch("/api/menu");
            const data = await response.json();
            setMenuData(data.data);
        };

        fetchMenuData();
    }, []);

    const handleDeleteMenuItem = async (dish) => {
        const response = await fetch(`/api/admin/menu/${dish.id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Dish deleted successfully");
        } else {
            toast.error("Failed to delete dish");
        }
    };

    const handleUpdateMenuItem = async (dish) => {};

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

            {!menuData && <LoadingPlaceholder />}

            {menuData && menuData.length === 0 && <EmptyLabel />}

            {menuData && menuData.length > 0 && (
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
                                    <td className="px-6 py-4">
                                        {item.spicyLevel}
                                    </td>
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
                                                    handleDeleteMenuItem(item)
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
            )}
        </div>
    );
};

export default Menu;
