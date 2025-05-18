"use client";

import React, { useEffect, useState } from "react";
import ImageSection from "./imageSection.jsx";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";
import { ReactHead } from "@/components/ReactHead";

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState(null);

    useEffect(() => {
        const fetchGalleryImages = async () => {
            const response = await fetch("/api/gallery");
            const data = await response.json();
            setGalleryImages(data.data);
        };

        fetchGalleryImages();
    }, []);

    return (
        <div className="space-y-10">
            <ReactHead>
                <title>Gallery - Luxora Restaurant</title>
                <meta
                    name="description"
                    content="Explore our gallery of delicious food and beautiful dining experiences."
                />
            </ReactHead>

            {!galleryImages && <LoadingPlaceholder />}

            {galleryImages && galleryImages.length === 0 && (
                <EmptyLabel>No images to show</EmptyLabel>
            )}

            {galleryImages && galleryImages.length > 0 && (
                <section className="space-y-10">
                    {galleryImages.map((galleryImage, idx) => (
                        <ImageSection key={idx} dataset={galleryImage} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default Gallery;
