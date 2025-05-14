"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Heading from "@/components/Heading";
const Book = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
        guests: 1,
        date: null,
    });

    const [disabledDates, setDisabledDates] = useState([]);

    // Can book only from tomorrow to 2 months from now
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(31);

    return (
        <div>
            <Heading className="mx-auto mb-8">Book a Table</Heading>

            <form
                className="flex max-w-lg flex-col gap-4 mx-auto"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Your name
                        <TextInput
                            id="name"
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
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Your email
                        <TextInput
                            id="email"
                            type="email"
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
                            id="phone"
                            type="tel"
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
                            id="guests"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={formValues.guests}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    guests: e.target.value,
                                })
                            }
                            required
                        />
                    </Label>
                </div>
                <div className="mb-2">
                    <Label className="flex flex-col gap-2">
                        Pick a Date
                        <DatePicker
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

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Book;
