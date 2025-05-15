"use client";

import Heading from "@/components/Heading";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NewEvent = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        date: "",
        location: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/admin/events", {
            method: "POST",
            body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Event added successfully");
            router.push("/admin/events");
        } else {
            toast.error("Failed to add event");
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
                        Description
                        <Textarea
                            placeholder="Event description..."
                            value={formValues.description}
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
                        Date
                        <TextInput
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            placeholder="2025-01-01"
                            value={formValues.date}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    date: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Location
                        <TextInput
                            type="text"
                            placeholder="Main Dining Hall"
                            value={formValues.location}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    location: e.target.value,
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

export default NewEvent;
