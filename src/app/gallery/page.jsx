import React from "react";
import ImageSection from "./imageSection";

const Gallery = () => {
    const galleryImages = [
        {
            section: "Dining Area",
            images: [
                {
                    src: "https://placehold.co/320x213",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/340x227",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/360x240",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/380x253",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/400x267",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
            ],
        },
        {
            section: "Dishes",
            images: [
                {
                    src: "https://placehold.co/320x213",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/340x227",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/360x240",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/380x253",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/400x267",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/420x280",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
            ],
        },
        {
            section: "Events",
            images: [
                {
                    src: "https://placehold.co/320x213",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/340x227",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/360x240",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
                {
                    src: "https://placehold.co/380x253",
                    alt: "Gallery Image",
                    imageFit: "cover",
                },
            ],
        },
    ];

    return (
        <div className="space-y-10">
            {galleryImages.map((galleryImage) => (
                <ImageSection
                    key={galleryImage.section}
                    dataset={galleryImage}
                />
            ))}
        </div>
    );
};

export default Gallery;
