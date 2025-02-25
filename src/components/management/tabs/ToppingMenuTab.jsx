"use client";
import React, { useState } from "react";
import LabelWithIcon from "../../../components/LableWithIcon";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

const ToppingMenuTab = () => {
    const router = useRouter();
    const [toppingGroups, setToppingGroups] = useState([
        { id: "1", name: "Loại Topping 1", toppings: [{ id: "101" }, { id: "102" }, { id: "103" }] },
        { id: "2", name: "Loại Topping 2", toppings: [{ id: "201" }, { id: "202" }] },
        { id: "3", name: "Loại Topping 3", toppings: [{ id: "301" }, { id: "302" }, { id: "303" }, { id: "304" }] },
        { id: "4", name: "Loại Topping 4", toppings: [{ id: "401" }] },
    ]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");


    const handleAddGroup = () => {
        if (!newGroupName.trim()) return; // Prevent empty names
        const newGroup = {
            id: Date.now().toString(), // Generate unique ID
            name: newGroupName,
            toppings: [],
        };
        setToppingGroups([...toppingGroups, newGroup]);
        setNewGroupName(""); // Clear input
        setIsModalOpen(false); // Close modal
    };

    return (
        <div className="w-full p-4">
            <Modal 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleAddGroup} 
                title="Thêm Nhóm Topping" 
                confirmTitle="Lưu" 
                closeTitle="Hủy"
            >
                <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Nhập tên nhóm topping"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </Modal>

            <div className="flex justify-between items-center border-b pb-2 mx-3">
                <LabelWithIcon title="Thêm nhóm" iconPath="/assets/plus.png" onClick={() => setIsModalOpen(true)} />
            </div>

            <div className="mt-6">
                {toppingGroups.map((group) => (
                    <div 
                        key={group.id} 
                        className="flex justify-between items-center bg-white p-3 rounded-md shadow-md cursor-pointer my-2 hover:bg-gray-100"
                        onClick={() => router.push(`menu/topping/${group.id}/detail`)}
                    >
                        <p className="font-semibold">{group.name}</p>
                        <p className="text-gray-500">{group.toppings.length} toppings</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToppingMenuTab;
