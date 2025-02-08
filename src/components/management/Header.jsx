'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const Header = ({ title, goBack }) => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between shadow-lg py-3 px-5 fixed top-0 left-0 right-0 z-50 bg-white">
                {goBack ? (
                    <div className="flex items-center justify-start">
                        <div
                            className="w-6 h-6 bg-transparent mr-6"
                            onClick={() => router.back()} // Go back to the previous page
                        >
                            <Image
                                src="/assets/back.png"
                                alt="Back Icon"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                            
                        </div>
                        <h3 className="text-[#4A4B4D] text-[24px]">{title}</h3>
                    </div>

                ) : (
                    <div>
                        <h3 className="text-[#4A4B4D] text-[24px]">{title}</h3>
                    </div>
                )}

                {/* Store Name */}


                {/* Icons */}
                <div className="flex items-center space-x-7">

                    {/* Notification Icon */}
                    <Link href="#" aria-label="Notifications">
                        <Image
                            src="/assets/notification.png"
                            alt="Notification Icon"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                        />
                    </Link>
                    {/* User Icon */}
                    <Link href="#" aria-label="User Profile">
                        <Image
                            src="/assets/user.png"
                            alt="User Icon"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                        />
                    </Link>

                </div>
            </div>
        </>

    );
};


export default Header;