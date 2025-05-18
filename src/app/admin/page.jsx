"use client";

import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { TbMenu4, TbCalendar } from "react-icons/tb";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { CiGrid42 } from "react-icons/ci";
import { ShortNumber } from "@lytieuphong/short-number";

import Heading from "@/components/Heading";
import { IoImageOutline, IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

const Dashboard = () => {
    const [adminStats, setAdminStats] = useState(null);

    useEffect(() => {
        const fetchAdminStats = async () => {
            const response = await fetch("/api/admin/stats");
            const data = await response.json();
            setAdminStats(data);
        };

        fetchAdminStats();
    }, []);

    return (
        <div>
            <Heading className="mb-6">Site Stats</Heading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <StatCard
                    Icon={CiGrid42}
                    label="Total Reservations"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.total_reservations)
                            : null
                    }
                />
                <StatCard
                    Icon={TbCalendar}
                    label="Today's Reservations"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.today_reservations)
                            : null
                    }
                />
                <StatCard
                    Icon={HiArrowTrendingUp}
                    label="This Week's Reservations"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.week_reservations)
                            : null
                    }
                />
                <StatCard
                    Icon={TbMenu4}
                    label="Total Menu Items"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.total_menu_items)
                            : null
                    }
                />
                <StatCard
                    Icon={MdOutlineEventNote}
                    label="Total Events"
                    value={
                        adminStats ? ShortNumber(adminStats.total_events) : null
                    }
                />
                <StatCard
                    Icon={IoImageOutline}
                    label="Total Gallery Images"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.total_gallery_images)
                            : null
                    }
                />
                <StatCard
                    Icon={VscPreview}
                    label="Total Testimonials"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.total_testimonials)
                            : null
                    }
                />
                <StatCard
                    Icon={IoChatbubbleOutline}
                    label="Total Messages"
                    value={
                        adminStats
                            ? ShortNumber(adminStats.total_messages)
                            : null
                    }
                />
            </div>
        </div>
    );
};

export default Dashboard;
