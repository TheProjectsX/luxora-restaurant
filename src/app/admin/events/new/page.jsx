"use client";

import Heading from "@/components/Heading";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, use, useState } from "react";
import { toast } from "react-toastify";

const NewEvent = ({ searchParams }) => {
    const { edit: eventId } = use(searchParams);

    const [formValues, setFormValues] = useState({
        name: "",
        banner: "",
        description: "",
        date: "",
        deadline: "",
        location: "",
    });

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`/api/admin/events/${eventId}`);
            const data = await response.json();
            if (data.success) {
                setFormValues({
                    ...data.data,
                    date: data.data?.date
                        ? new Date(data.data.date).toISOString().split("T")[0]
                        : "",
                    deadline: data.data?.deadline
                        ? new Date(data.data.deadline)
                              .toISOString()
                              .split("T")[0]
                        : "",
                });
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response;

        if (eventId) {
            response = await fetch(`/api/admin/events/${eventId}`, {
                method: "PUT",
                body: JSON.stringify(formValues),
            });
        } else {
            response = await fetch("/api/admin/events", {
                method: "POST",
                body: JSON.stringify(formValues),
            });
        }

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            if (!eventId) {
                setFormValues({
                    name: "",
                    banner: "",
                    description: "",
                    date: "",
                    deadline: "",
                    location: "",
                });
            }
        } else {
            toast.error(data.error ?? "Failed to perform action");
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
                        Event Name
                        <TextInput
                            name="name"
                            type="text"
                            placeholder="Event Name"
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
                        Event Banner
                        <TextInput
                            name="banner"
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={formValues.banner}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    banner: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Event Description
                        <Textarea
                            name="description"
                            placeholder="Event description..."
                            value={formValues.description}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            required
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Event Date
                        <TextInput
                            name="date"
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
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Event Deadline
                        <TextInput
                            name="date"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            placeholder="2025-01-01"
                            value={formValues.deadline}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    deadline: e.target.value,
                                })
                            }
                        />
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        Event Location
                        <TextInput
                            name="location"
                            type="text"
                            placeholder="Event Location"
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
