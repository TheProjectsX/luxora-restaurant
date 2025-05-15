"use client";

import Heading from "@/components/Heading";
import {
    Button,
    Label,
    RangeSlider,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";
import React, { useState } from "react";

const NewDish = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        isVegan: false,
        spicyLevel: 0,
    });

    return (
        <div>
            <Heading className="mb-6">Add new Event</Heading>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6 max-w-lg max-[770px]:mx-auto"
            >
                <div>
                    <Label className="flex flex-col gap-2">
                        Name
                        <TextInput
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
                        Description
                        <Textarea
                            placeholder="Dish description..."
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
                        Price (৳)
                        <TextInput
                            type="number"
                            placeholder="10"
                            value={formValues.price}
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
                        Category
                        <TextInput
                            type="text"
                            placeholder="Main Dish"
                            value={formValues.category}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    category: e.target.value,
                                })
                            }
                            required
                        />
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
