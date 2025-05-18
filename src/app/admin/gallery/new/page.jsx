"use client";

import Heading from "@/components/Heading";
import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const NewGalleryItem = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        image: "",
        category: "Dining Area",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/admin/gallery", {
            method: "POST",
            body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Gallery item added successfully");
            setFormValues({
                title: "",
                image: "",
                category: "Dining Area",
            });
        } else {
            toast.error("Failed to add gallery item");
        }
    };

    return (
        <div>
            <Heading className="mb-6">Add new Event</Heading>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-lg max-[770px]:mx-auto"
            >
                <div>
                    <Label className="flex flex-col gap-2">
                        Title
                        <TextInput
                            name="title"
                            type="text"
                            placeholder="Spicy Thai Basil Chicken"
                            value={formValues.title}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    title: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Image
                        <TextInput
                            name="image"
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={formValues.image}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    image: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Category
                        <Select
                            name="category"
                            value={formValues.category}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    category: e.target.value,
                                })
                            }
                            required
                        >
                            <option>Dining Area</option>
                            <option>Dish</option>
                            <option>Events</option>
                        </Select>
                    </Label>
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default NewGalleryItem;
