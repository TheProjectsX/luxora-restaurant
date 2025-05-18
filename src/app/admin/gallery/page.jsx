"use client";

import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";

const Gallery = () => {
    const [galleryData, setGalleryData] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            const response = await fetch("/api/admin/gallery");
            const data = await response.json();
            setGalleryData(data.data);
        };

        fetchGallery();
    }, []);

    return (
        <div>
            <div className="mb-6 pt-4 w-fit flex items-center gap-5">
                <Heading>Gallery</Heading>
                <Spinner light size="md" hidden />
            </div>

            {!galleryData && <LoadingPlaceholder />}

            {galleryData && galleryData.length === 0 && (
                <EmptyLabel>No gallery found</EmptyLabel>
            )}

            {/* Table */}
            {galleryData && galleryData.length > 0 && (
                <div className="relative overflow-x-auto scrollbar-thin shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-xs text-center text-gray-600">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleryData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded-lg mx-auto"
                                        />
                                    </td>
                                    <td className="px-6 py-4">{item.title}</td>
                                    <td className="px-6 py-4 capitalize">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="text-red-600 hover:underline whitespace-nowrap"
                                            onClick={() =>
                                                handleDeleteGalleryItem(item.id)
                                            }
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

export default Gallery;
