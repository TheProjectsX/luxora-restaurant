import { signIn } from "@/auth";
import Heading from "@/components/Heading";
import { Button, Label, TextInput } from "flowbite-react";
import { redirect } from "next/navigation";
import React from "react";
import { ReactHead } from "@/components/ReactHead";

const SignInPage = async ({ searchParams }) => {
    const { error } = await searchParams;

    return (
        <div className="w-full h-full flex justify-center items-center py-10">
            <ReactHead>
                <title>Sign In - Luxora Restaurant</title>
                <meta
                    name="description"
                    content="Sign in to your account to manage your reservations and orders."
                />
            </ReactHead>

            <div className="w-full max-w-md">
                <Heading className="mx-auto mb-10">
                    Login to your account
                </Heading>

                <form
                    action={async (formData) => {
                        "use server";
                        const data = Object.fromEntries(formData);

                        const result = await signIn("credentials", {
                            redirect: false,
                            ...data,
                        });

                        if (result?.error) {
                            redirect("/signin?error=true");
                        } else {
                            redirect("/admin");
                        }
                    }}
                    className="space-y-6"
                >
                    {error && (
                        <div className="bg-red-500 text-white p-2 rounded-md text-center">
                            Invalid credentials
                        </div>
                    )}

                    <div>
                        <Label className="flex flex-col gap-2">
                            Email
                            <TextInput
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </Label>
                    </div>

                    <div>
                        <Label className="flex flex-col gap-2">
                            Password
                            <TextInput
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                            />
                        </Label>
                    </div>

                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
