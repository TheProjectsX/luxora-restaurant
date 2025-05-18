"use client";

import Heading from "@/components/Heading";
import {
    Button,
    Label,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";
import React, { useEffect, use, useState } from "react";
import { toast } from "react-toastify";

const NewDish = ({ searchParams }) => {
    const { edit: dishId } = use(searchParams);

    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        category: "Starters",
        isVegan: false,
        spicyLevel: 0,
    });

    useEffect(() => {
        const fetchDish = async () => {
            const response = await fetch(`/api/admin/menu/${dishId}`);
            const data = await response.json();
            if (data.success) {
                setFormValues(data.data);
            }
        };

        if (dishId) {
            fetchDish();
        }
    }, [dishId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response;

        if (dishId) {
            response = await fetch(`/api/admin/menu/${dishId}`, {
                method: "PUT",
                body: JSON.stringify(formValues),
            });
        } else {
            response = await fetch("/api/admin/menu", {
                method: "POST",
                body: JSON.stringify(formValues),
            });
        }

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            if (!dishId) {
                setFormValues({
                    name: "",
                    description: "",
                    image: "",
                    price: "",
                    category: "Starters",
                    isVegan: false,
                    spicyLevel: 0,
                });
            }
        } else {
            toast.error(data.error ?? "Failed to perform action");
        }
    };

    return (
        <div>
            <Heading className="mb-6">Add new Dish</Heading>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-lg max-[770px]:mx-auto"
            >
                <div>
                    <Label className="flex flex-col gap-2">
                        Name
                        <TextInput
                            name="name"
                            type="text"
                            placeholder="Spicy Thai Basil Chicken"
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
                        Description
                        <Textarea
                            name="description"
                            placeholder="Dish description..."
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
                        Price (৳)
                        <TextInput
                            name="price"
                            type="number"
                            placeholder="10"
                            value={formValues.price}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    price: e.target.value,
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
                            <option>Starters</option>
                            <option>Mains</option>
                            <option>Desserts</option>
                            <option>Drinks</option>
                            <option>Vegan</option>
                            <option>Seasonal</option>
                        </Select>
                    </Label>
                </div>

                <div>
                    <Label className="flex flex-col gap-2">
                        <span className="flex items-center gap-2">
                            Spicy Level
                            <span className="text-sm text-gray-800 font-semibold">
                                ({formValues.spicyLevel})
                            </span>
                        </span>

                        <RangeSlider
                            name="spicyLevel"
                            min={0}
                            max={5}
                            step={1}
                            value={formValues.spicyLevel}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    spicyLevel: e.target.value,
                                })
                            }
                        />
                    </Label>
                </div>

                <div>
                    <ToggleSwitch
                        name="isVegan"
                        checked={formValues.isVegan}
                        label="Is this dish vegan?"
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                isVegan: e,
                            })
                        }
                    />
                </div>

                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default NewDish;
