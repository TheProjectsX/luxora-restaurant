import React from "react";
import { ReactHead } from "@/components/ReactHead";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <ReactHead>
                <title>About Us - Luxora Restaurant</title>
                <meta
                    name="description"
                    content="Learn more about Luxora Restaurant, our mission, and our commitment to culinary excellence."
                />
            </ReactHead>
            {/* Hero Section */}
            <div
                className="relative aspect-[2/1] bg-cover bg-center bg-no-repeat w-full rounded-2xl"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1565895405140-6b9830a88c19)`,
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-white text-center ">
                        Our Story
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Story Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                        Welcome to Luxora
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="space-y-4 text-gray-600 md:flex-1/2">
                            <p>
                                Founded in 2020, Luxora Restaurant has quickly
                                become a culinary destination known for its
                                innovative fusion cuisine and exceptional dining
                                experience. Our journey began with a simple
                                vision: to create a space where food becomes an
                                art form and every meal is a celebration of
                                flavors.
                            </p>
                            <p>
                                Nestled in the heart of the city, our restaurant
                                combines contemporary design with warm
                                hospitality, offering guests an unforgettable
                                dining experience that engages all the senses.
                            </p>
                        </div>
                        <div className="relative rounded-lg overflow-hidden md:flex-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1562514155-444b9a967dfa"
                                alt="Our Chef at Work"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mb-16 bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 max-w-3xl">
                        At Luxora, we are committed to redefining the dining
                        experience through culinary excellence, sustainable
                        practices, and genuine hospitality. We source our
                        ingredients locally whenever possible, supporting our
                        community while ensuring the freshest flavors for our
                        guests.
                    </p>
                </section>

                {/* Values Section */}
                <section>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                        Our Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Culinary Excellence
                            </h3>
                            <p className="text-gray-600">
                                We strive for perfection in every dish,
                                combining traditional techniques with innovative
                                approaches to create memorable culinary
                                experiences.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Sustainability
                            </h3>
                            <p className="text-gray-600">
                                Our commitment to sustainability guides our
                                choices, from ingredient sourcing to waste
                                reduction, ensuring we leave a positive impact
                                on our environment.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Hospitality
                            </h3>
                            <p className="text-gray-600">
                                We believe in creating warm, welcoming spaces
                                where every guest feels valued and leaves with a
                                desire to return.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
