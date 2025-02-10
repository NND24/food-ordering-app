"use client";
import React, { useState } from "react";
import Link from "next/link";

// Import each section component
import BasicInfo from "./tabs/setting/BasicInfo";
import OperatingHours from "./tabs/setting/OperatingHours";
import ProfileImages from "./tabs/setting/ProfileImages";
import PrinterSettings from "./tabs/setting/PrinterSettings";

// Mapping section titles to components
const sectionComponents = {
    "Thông tin cơ bản": BasicInfo,
    "Thời gian hoạt động": OperatingHours,
    "Ảnh đại diện và Ảnh bìa": ProfileImages,
    "Cài đặt máy in": PrinterSettings,
};

const ExpandableSettings = () => {
    const [openTab, setOpenTab] = useState(null);

    // ✅ Toggle function
    const toggleTab = (tab) => {
        setOpenTab(openTab === tab ? null : tab); // Close if clicked again
    };

    return (
        <div className="">
            <ul className="space-y-4">
                {Object.keys(sectionComponents).map((title, index) => {
                    const SectionComponent = sectionComponents[title];

                    return (
                        <li key={index} className="border-b pb-2">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleTab(index)}
                            >
                                <Link href="#">{title}</Link>
                                <span className="text-gray-500">{openTab === index ? "▲" : "▼"}</span>
                            </div>

                            {openTab === index && (
                                <div className="mt-2 bg-gray-50 p-3 rounded-md">
                                    <SectionComponent />
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ExpandableSettings;
