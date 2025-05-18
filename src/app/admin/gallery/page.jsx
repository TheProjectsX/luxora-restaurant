"use client";

import React, { useEffect, useState } from "react";

import Heading from "@/components/Heading";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { ReactHead } from "@/components/ReactHead";

const Gallery = () => {
    const [galleryData, setGalleryData] = useState(null);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            const response = await fetch("/api/admin/gallery?limit=8");
            const data = await response.json();
            setGalleryData(data.data);
            setPagination(data.pagination);
        };

        fetchGallery();
    }, []);

    // Delete Gallery Item
    const handleDeleteGalleryItem = async (item) => {
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

        const response = await fetch(`/api/admin/gallery/${item.id}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setGalleryData((prev) => prev.filter((i) => i.id !== item.id));
        } else {
            toast.error(data.error);
        }
    };

    // Load More Data
    const handleLoadMore = async () => {
        const response = await fetch(
            `/api/admin/gallery?limit=8&page=${pagination.current_page + 1}`
        );
        const data = await response.json();
        setGalleryData((prev) => [...prev, ...data.data]);
        setPagination(data.pagination);
    };

    return (
        <div>
            <ReactHead>
                <title>Gallery - Admin Dashboard</title>
                <meta
                    name="description"
                    content="Manage the gallery of Luxora Restaurant."
                />
            </ReactHead>

            <div className="flex items-center gap-5 mb-6">
                <Heading>Gallery</Heading>
                <Link
                    href="/admin/gallery/new"
                    className="text-primary-600 hover:underline underline-offset-4"
                >
                    Add New
                </Link>
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
                                                handleDeleteGalleryItem(item)
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

            {pagination?.has_next_page && (
                <div className="flex justify-center mt-6">
                    <Button
                        color={"dark"}
                        onClick={() => handleLoadMore()}
                        className="cursor-pointer"
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Gallery;
