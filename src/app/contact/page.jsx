"use client";

import Heading from "@/components/Heading";
import { Textarea, TextInput, Button, Label } from "flowbite-react";
import React, { useState } from "react";
import { IoCallSharp, IoLocationSharp, IoMailSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Contact = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Message sent successfully");
            setFormValues({
                name: "",
                email: "",
                message: "",
            });
        } else {
            toast.error("Failed to send message");
        }
    };
    return (
        <div>
            <Heading className="mx-auto mb-6">Contact Us</Heading>
            <div className="flex flex-col md:flex-row items-start justify-around gap-8 md:gap-4 md:py-5 mb-8">
                {/* Business Hours Section */}
                <section className="w-full md:w-auto md:flex-1/2 md:py-5">
                    <div className="max-w-md mx-auto">
                        <p className="text-gray-800 font-medium mb-4">
                            Contact us for any inquiries or to make a
                            reservation. We are always here to help you.
                        </p>

                        <p className="mb-2">
                            <a
                                href="#"
                                className="flex items-center gap-1 text-blue-600 underline-offset-4 hover:underline"
                            >
                                <IoCallSharp /> +8801712345678
                            </a>
                        </p>

                        <p className="mb-2">
                            <a
                                href="#"
                                className="flex items-center gap-1 text-blue-600 underline-offset-4 hover:underline"
                            >
                                <IoMailSharp /> contact@example.com
                            </a>
                        </p>

                        <p className="mb-2 flex items-center gap-1">
                            <IoLocationSharp /> Nilkhet Road, Dhaka, Bangladesh
                        </p>

                        <div className="py-2">
                            <h4 className="text-lg font-medium underline underline-offset-4 mb-3">
                                Business Hours
                            </h4>

                            <table className="flex flex-col gap-2 text-gray-700">
                                <tbody>
                                    <tr>
                                        <td>Sunday - Thursday: &nbsp;</td>
                                        <td>10:00 AM - 10:00 PM</td>
                                    </tr>

                                    <tr>
                                        <td>Friday - Saturday:</td>
                                        <td>10:00 AM - 11:00 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="w-full md:w-auto md:flex-1/2">
                    <form
                        className="flex max-w-md flex-col gap-4 mx-auto"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-2">
                            <Label className="flex flex-col gap-2">
                                Your Name
                                <TextInput
                                    name="name"
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
                                Your Email
                                <TextInput
                                    name="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
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
                                Your Message
                                <Textarea
                                    name="message"
                                    placeholder="Your message"
                                    value={formValues.message}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            message: e.target.value,
                                        })
                                    }
                                    required
                                    rows={3}
                                />
                            </Label>
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </section>
            </div>

            {/* Google Map Section */}
            <section className="w-full aspect-[2/1]">
                <Heading className="mx-auto md:mx-0 mb-6">
                    Find Us on Google Map
                </Heading>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5005.050661979085!2d90.39087053844055!3d23.73361171521127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e90a449e4f%3A0xb7092a9c25197fa4!2sUniversity%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1747234595244!5m2!1sen!2sbd"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;
