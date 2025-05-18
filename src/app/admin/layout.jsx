import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

import { VscPreview } from "react-icons/vsc";
import { CiBoxList } from "react-icons/ci";
import { GoBook } from "react-icons/go";
import { BsCalendar4Event } from "react-icons/bs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { IoImageOutline, IoChatbubbleOutline } from "react-icons/io5";

export const metadata = {
    title: "Luxora - Admin Panel",
    description: "Control your restaurant from here",
};

const Layout = async ({ children }) => {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }

    return (
        <div className="grid overflow-visible grid-cols-[1fr_320px] w-full max-width mx-auto px-3 py-3 max-[770px]:grid-cols-1 gap-10 ">
            <div className="sm:px-2 overflow-x-hidden">{children}</div>
            <aside
                className={`sticky top-[65px] max-h-[calc(100vh-65px)] overflow-y-auto scrollbar-track-transparent scrollbar-thumb-transparent scrollbar-thin hover:scrollbar-thumb-neutral-500/50 shrink-0`}
            >
                <div className="w-full p-4 bg-gray-100 rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                    <div className="flex flex-col bg-white p-3 rounded-lg shadow-lg">
                        <Link
                            href="/admin"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <LuLayoutDashboard className="text-xl" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/reservations"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <CiBoxList className="text-xl" />
                            Reservations
                        </Link>
                        <Link
                            href="/admin/testimonials"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <VscPreview className="text-xl" />
                            Testimonials
                        </Link>
                        <Link
                            href="/admin/events"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <BsCalendar4Event className="text-xl" />
                            Events
                        </Link>
                        <Link
                            href="/admin/menu"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <GoBook className="text-xl" />
                            Menu Items
                        </Link>
                        <Link
                            href="/admin/gallery"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <IoImageOutline className="text-xl" />
                            Gallery
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="w-full px-4 py-3 rounded bg-white hover:bg-slate-100 flex items-center gap-3"
                        >
                            <IoChatbubbleOutline className="text-xl" />
                            Messages
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

// export default withAdmin(Layout);
export default Layout;
