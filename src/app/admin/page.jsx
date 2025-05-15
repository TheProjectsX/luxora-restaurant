"use client";

import React from "react";
import StatCard from "./StatCard";
import { TbMenu4, TbCalendar } from "react-icons/tb";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { CiGrid42 } from "react-icons/ci";
import { ShortNumber } from "@lytieuphong/short-number";

import Heading from "@/components/Heading";

const Dashboard = () => {
    const loader = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34.67"
            height="8"
            viewBox="0 44 52 12"
        >
            <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1.2s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1"
                />
            </circle>
            <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1.2s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2"
                />
            </circle>
            <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1.2s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3"
                />
            </circle>
        </svg>
    );

    const isSuccess = true;
    const adminStats = {
        success: true,

        total_reservations: 150,
        today_reservations: 12,
        week_reservations: 45,
        total_menu_items: 25,
    };

    return (
        <div>
            <Heading className="mb-6">Site Stats</Heading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <StatCard
                    Icon={CiGrid42}
                    label="Total Reservations"
                    value={
                        isSuccess
                            ? ShortNumber(adminStats.total_reservations)
                            : loader
                    }
                />
                <StatCard
                    Icon={TbCalendar}
                    label="Today's Reservations"
                    value={
                        isSuccess
                            ? ShortNumber(adminStats.today_reservations)
                            : loader
                    }
                />
                <StatCard
                    Icon={HiArrowTrendingUp}
                    label="This Week's Reservations"
                    value={
                        isSuccess
                            ? ShortNumber(adminStats.week_reservations)
                            : loader
                    }
                />
                <StatCard
                    Icon={TbMenu4}
                    label="Total Menu Items"
                    value={
                        isSuccess
                            ? ShortNumber(adminStats.total_menu_items)
                            : loader
                    }
                />
            </div>
        </div>
    );
};

export default Dashboard;
