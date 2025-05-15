"use client";

import React, { useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Heading from "@/components/Heading";

const ImageSection = ({
    dataset,
}: {
    dataset: {
        section: string;
        images: {
            src: string;
            alt: string;
        }[];
    };
}) => {
    const [imageIndex, setImageIndex] = useState(-1);

    return (
        <section key={dataset.section}>
            <Heading className="mb-6">{dataset.section}</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataset.images.map((image, index) => (
                    <div
                        className="w-full h-full cursor-pointer"
                        key={index}
                        onClick={() => setImageIndex(index)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <Lightbox
                index={imageIndex}
                open={imageIndex !== -1}
                close={() => setImageIndex(-1)}
                slides={dataset.images}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </section>
    );
};

export default ImageSection;
