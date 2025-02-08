'use client';

import NavBar from "../../../../../../components/management/NavBar";
import Image from "next/image";
import React, { useState } from "react";
import Header from "../../../../../../components/management/Header";
import LabelWithIcon from "../../../../../../components/LableWithIcon";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Modal from "../../../../../../components/management/Modal";

const Page = () => {
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [isAddToppingModalOpen, setIsAddToppingModalOpen] = useState(false);
    const [selectedTopping, setSelectedTopping] = useState(null);
    const [newToppingName, setNewToppingName] = useState("");
    const [newToppingPrice, setNewToppingPrice] = useState("");
    const [isDragEnabled, setIsDragEnabled] = useState(false);

    const toggleDrag = () => setIsDragEnabled((prev) => !prev);


    const [toppingGroup, setToppingGroup] = useState({
        id: 1,
        name: "Nhóm Topping 1",
        toppings: [
            { id: "101", name: "Topping A", price: "10,000đ" },
            { id: "102", name: "Topping B", price: "15,000đ" },
            { id: "103", name: "Topping C", price: "20,000đ" },
        ],
    });

    // Handle drag end for sorting toppings
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setToppingGroup((prevGroup) => {
            const oldIndex = prevGroup.toppings.findIndex((t) => t.id === active.id);
            const newIndex = prevGroup.toppings.findIndex((t) => t.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return prevGroup;

            const newToppings = arrayMove(prevGroup.toppings, oldIndex, newIndex);
            return { ...prevGroup, toppings: newToppings };
        });
    };

    // Open price edit modal
    const openPriceModal = (topping) => {
        setSelectedTopping(topping);
        setNewToppingPrice(topping.price); // ✅ Set the price when opening modal
        setIsPriceModalOpen(true);
    };


    const handlePriceUpdate = () => {
        if (!selectedTopping) return;

        setToppingGroup((prevGroup) => ({
            ...prevGroup,
            toppings: prevGroup.toppings.map((t) =>
                t.id === selectedTopping.id ? { ...t, price: newToppingPrice } : t
            ),
        }));

        setIsPriceModalOpen(false);
    };

    // Add new topping
    const handleAddTopping = () => {
        if (newToppingName.trim() && newToppingPrice.trim()) {
            setToppingGroup((prevGroup) => ({
                ...prevGroup,
                toppings: [
                    ...prevGroup.toppings,
                    {
                        id: String(Date.now()), // Generate unique ID
                        name: newToppingName,
                        price: newToppingPrice,
                    },
                ],
            }));
        }
        setIsAddToppingModalOpen(false);
    };

    return (
        <>
            {/* Edit Price Modal */}
            <Modal
                open={isPriceModalOpen}
                onClose={() => setIsPriceModalOpen(false)}
                onConfirm={handlePriceUpdate}
                title="Chỉnh sửa giá"
                confirmTitle="Lưu"
                closeTitle="Hủy"
            >
                <input
                    type="text"
                    value={newToppingPrice}
                    onChange={(e) => setNewToppingPrice(e.target.value)}
                    placeholder="Nhập giá mới"
                    className="w-full p-2 border rounded-md mb-4"
                    required
                />
            </Modal>

            {/* Add Topping Modal */}
            <Modal
                open={isAddToppingModalOpen}
                onClose={() => setIsAddToppingModalOpen(false)}
                onConfirm={handleAddTopping}
                title="Thêm Topping Mới"
                confirmTitle="Thêm"
                closeTitle="Hủy"
            >
                <input
                    type="text"
                    value={newToppingName}
                    onChange={(e) => setNewToppingName(e.target.value)}
                    placeholder="Nhập tên topping"
                    className="w-full p-2 border rounded-md mb-4"
                    required
                />
                <input
                    type="text"
                    value={newToppingPrice}
                    onChange={(e) => setNewToppingPrice(e.target.value)}
                    placeholder="Nhập giá topping"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </Modal>

            {/* Header */}
            <Header title={toppingGroup.name} goBack={true} />

            <div className="flex space-x-2 mt-24 flex items-center justify-between mx-4">
                <LabelWithIcon title="Vị trí" iconPath="/assets/menu.png" onClick={toggleDrag} />
                <LabelWithIcon title="Thêm" iconPath="/assets/plus.png" onClick={() => setIsAddToppingModalOpen(true)} />
            </div>

            {/* Topping List */}
            <div className="pt-[10px] pb-[10px] bg-gray-100 mt-4">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={toppingGroup.toppings.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                        <div className="bg-white rounded-md p-2">
                            {toppingGroup.toppings.map((topping) => (
                                <SortableItem key={topping.id} item={topping} openPriceModal={openPriceModal} isDragEnabled={isDragEnabled} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Navigation Bar */}
            <NavBar page="orders" />
        </>
    );
};

// Sortable Topping Item
const SortableItem = ({ item, openPriceModal, isDragEnabled }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
        disabled: !isDragEnabled,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="flex items-center justify-between bg-white p-3 rounded-md shadow-md cursor-grab my-2"
        >
            {/* Left: Drag Icon & Topping Name */}
            <div className="flex items-center space-x-3">
                {isDragEnabled ? <Image src="/assets/menu.png" alt="Drag" width={20} height={20} /> : <></>}
                <div>
                    <p className="font-semibold">{item.name}</p>
                </div>
            </div>

            {/* Right: Price & Edit Button */}
            <div className="flex items-center space-x-3">
                <p className="text-gray-500">{item.price}</p>
                <button
                    onClick={() => openPriceModal(item)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                    Sửa
                </button>
            </div>
        </div>
    );
};

export default Page;
