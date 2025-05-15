"use client";

import Heading from "@/components/Heading";
import React, { useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const NewTestimonial = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        review: "",
        rating: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/admin/testimonials", {
            method: "POST",
            body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Testimonial added successfully");
            router.push("/admin/testimonials");
        } else {
            toast.error("Failed to add testimonial");
        }
    };

    return (
        <div>
            <Heading className="mb-6">Add new Testimonial</Heading>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-lg max-[770px]:mx-auto"
            >
                <div>
                    <Label className="flex flex-col gap-2">
                        Name
                        <TextInput
                            type="text"
                            placeholder="John Doe"
                            value={formValues.name}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Review
                        <Textarea
                            placeholder="User review..."
                            value={formValues.review}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    review: e.target.value,
                                })
                            }
                            rows={3}
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Rating
                        <TextInput
                            type="number"
                            placeholder="4"
                            value={formValues.rating}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    rating: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>

                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default NewTestimonial;
