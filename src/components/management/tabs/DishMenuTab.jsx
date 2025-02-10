"use client";
import React, { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LabelWithIcon from "../../../components/LableWithIcon";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DishTab = () => {
    const router = useRouter();
    const [changePos, setChangePos] = useState(false);
    const [menu, setMenu] = useState([
        {
            category: "Thẻ Mới Ngon",
            items: [
                { displayOrder: 1, id: "1", name: "ĐẠI TIỆC SIÊU MẠI", price: "349,000đ", enabled: true, image: "/assets/app_logo.png" },
                { displayOrder: 2, id: "2", name: "ĐẠI TIỆC TÔM VƯƠNG", price: "529,000đ", enabled: true, image: "/assets/app_logo.png" },
                { displayOrder: 3, id: "3", name: "Cơm chiên", price: "25,000đ", enabled: true, image: "/assets/app_logo.png" },
                { displayOrder: 4, id: "4", name: "Món tặng 1", price: "12đ", enabled: true, image: "/assets/app_logo.png" },
                { displayOrder: 5, id: "5", name: "Nhung", price: "10,000đ", enabled: true, image: "/assets/app_logo.png" },
            ],
        },
        {
            category: "Ghiền Gà",
            items: [
                { displayOrder: 1, id: "6", name: "Gà Không Xương Xóc Mắm Tỏi Mek...", price: "119,000đ", enabled: true, image: "/assets/app_logo.png" },
            ],
        },
    ]);

    // Debugging
    useEffect(() => {
        console.log(menu);
    }, [menu]);

    // ✅ Fix: Correctly update `menu` state instead of using `setItems`
    const toggleItemEnabled = (id) => {
        setMenu((prevMenu) =>
            prevMenu.map((section) => ({
                ...section,
                items: section.items.map((item) =>
                    item.id === id ? { ...item, enabled: !item.enabled } : item
                ),
            }))
        );
    };

    // Handle drag end
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setMenu((prevMenu) => {
            return prevMenu.map((section) => {
                const oldIndex = section.items.findIndex((item) => item.id === active.id);
                const newIndex = section.items.findIndex((item) => item.id === over.id);

                if (oldIndex === -1 || newIndex === -1) return section;

                const newItems = arrayMove(section.items, oldIndex, newIndex);
                const updatedItems = newItems.map((item, index) => ({
                    ...item,
                    displayOrder: index + 1,
                }));

                return { ...section, items: updatedItems };
            });
        });
    };

    const toggleChangePos = () => setChangePos((prev) => !prev);

    return (
        <div className="w-full p-4">
            {/* Tabs Header */}
            <div className="flex justify-between items-center border-b pb-2 mx-4">
                <LabelWithIcon title="Vị trí" iconPath="/assets/menu.png" onClick={toggleChangePos} />
                <LabelWithIcon title="Thêm" iconPath="/assets/plus.png" onClick={() => router.push("menu/add")} />
                <LabelWithIcon title="Chỉnh sửa danh mục" iconPath="/assets/editing.png" onClick={() => router.push("menu/category")}/>
            </div>

            {/* Render categories */}
            {menu.map((section) => (
                <div key={section.category} className="mt-6">
                    <h3 className="font-bold text-xl mb-2">{section.category}</h3>

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={section.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            <div className="bg-gray-100 rounded-md p-2">
                                {section.items.map((item) => (
                                    <SortableItem key={item.id} item={item} router={router} changePos={changePos} toggleItemEnabled={toggleItemEnabled} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            ))}
        </div>
    );
};

const SortableItem = ({ item, changePos, router, toggleItemEnabled }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
        disabled: !changePos,
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
            {/* Left Section: Image and Name */}
            <div className="flex items-center space-x-3" onClick={() => router.push(`menu/${item.id}/detail`)}>
                {changePos && <Image src="/assets/menu.png" alt="Drag" width={20} height={20} />}
                <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" />
                <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price}</p>
                </div>
            </div>

            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.enabled}
                    onChange={() => toggleItemEnabled(item.id)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
            </label>
        </div>
    );
};

export default DishTab;
