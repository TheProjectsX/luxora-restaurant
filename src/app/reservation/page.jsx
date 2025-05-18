"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Heading from "@/components/Heading";
import { bookingSchema } from "@/validations/bookingSchema";
import { toast } from "react-toastify";
import { ReactHead } from "@/components/ReactHead";

const Reservation = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
        guests: 1,
        date: null,
        time: "12:00",
    });

    const [disabledDates, setDisabledDates] = useState([]);

    // Can book only from tomorrow to 2 months from now
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(31);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = bookingSchema.safeParse(formValues);

        if (!validation.success) {
            validation.error.errors.forEach((err) => {
                toast.error(err.message);
            });
            return;
        }

        const date = new Date(validation.data.date);
        date.setHours(
            validation.data.time.split(":")[0],
            validation.data.time.split(":")[1],
            0,
            0
        );

        const body = {
            name: validation.data.name,
            email: validation.data.email,
            phone: validation.data.phone,
            guests: validation.data.guests,
            date: date.toISOString(),
        };

        const response = await fetch("/api/reservations", {
            method: "POST",
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setFormValues({
                name: "",
                email: "",
                phone: "",
                guests: 1,
                date: null,
                time: "12:00",
            });
        } else {
            toast.error(data.error ?? "Failed to submit booking");
        }
    };
    return (
        <div>
            <ReactHead>
                <title>Book a Table - Luxora Restaurant</title>
                <meta
                    name="description"
                    content="Book a table at Luxora Restaurant for a delicious dining experience."
                />
            </ReactHead>

            <Heading className="mx-auto mb-8">Book a Table</Heading>

            <form
                className="flex max-w-lg flex-col gap-4 mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Your name
                        <TextInput
                            type="text"
                            name="name"
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
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Your email
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="name@flowbite.com"
                            value={formValues.email}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    email: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Your phone
                        <TextInput
                            type="tel"
                            name="phone"
                            placeholder="123-456-7890"
                            value={formValues.phone}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    phone: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Number of guests
                        <TextInput
                            type="number"
                            name="guests"
                            min="1"
                            placeholder="1"
                            value={formValues.guests}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    guests: parseInt(e.target.value),
                                })
                            }
                            required
                        />
                    </Label>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="mb-2 flex-1">
                        <Label className="flex flex-col gap-2">
                            Pick a Date
                            <DatePicker
                                name="date"
                                selected={formValues.date}
                                onChange={(date) =>
                                    setFormValues({
                                        ...formValues,
                                        date: date,
                                    })
                                }
                                minDate={minDate}
                                maxDate={maxDate}
                                excludeDates={disabledDates}
                                placeholderText="Pick a date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-primary-600 block w-full p-2.5"
                                dateFormat="dd-MM-yyyy"
                                required
                            />
                        </Label>
                    </div>

                    <div className="mb-2 flex-1">
                        <Label className="flex flex-col gap-2">
                            Pick a Time
                            <TextInput
                                type="time"
                                name="time"
                                placeholder="12:00"
                                value={formValues.time}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        time: e.target.value,
                                    })
                                }
                            />
                        </Label>
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Reservation;
