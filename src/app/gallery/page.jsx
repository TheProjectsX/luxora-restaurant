"use client";

import React, { useEffect, useState } from "react";
import ImageSection from "./imageSection.jsx";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import EmptyLabel from "@/components/EmptyLabel";

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
            {!galleryImages && <LoadingPlaceholder />}

            {galleryImages && galleryImages.length === 0 && (
                <EmptyLabel>No images to show</EmptyLabel>
            )}

            {galleryImages && galleryImages.length > 0 && (
                <section className="space-y-10">
                    {galleryImages.map((galleryImage) => (
                        <ImageSection
                            key={galleryImage.section}
                            dataset={galleryImage}
                        />
                    ))}
                </section>
            )}
        </div>
    );
};

export default Gallery;
