'use client';

import NavBar from "../../../../components/management/NavBar";
import Image from "next/image";
import React, { useState } from "react";
import Header from "../../../../components/management/Header";
import LabelWithIcon from "../../../../components/LableWithIcon";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"; // Missing import
import Modal from "../../../../components/management/Modal"

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addCategory, setAddCateogry] = useState("")
    const [category, setCategory] = useState([
        { id: 1, displayOrder: 1, title: "Cat1" },
        { id: 2, displayOrder: 2, title: "Cat2" },
        { id: 3, displayOrder: 3, title: "Cat3" },
        { id: 4, displayOrder: 4, title: "Cat4" },
        { id: 5, displayOrder: 5, title: "Cat5" },
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setCategory((prevCategory) => {
            const oldIndex = prevCategory.findIndex((item) => item.id === active.id);
            const newIndex = prevCategory.findIndex((item) => item.id === over.id);
            return arrayMove(prevCategory, oldIndex, newIndex).map((item, index) => ({
                ...item,
                displayOrder: index + 1,
            }));
        });
    };

    const handleSubmit = () => {
        console.log("Submit the form")
    }

    return (
        <>
            <Modal open={isModalOpen} onClose={()=>{setIsModalOpen(false)}} onConfirm={handleSubmit} title="Thêm Danh Mục" confirmTitle="Lưu" closeTitle="Hủy">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={addCategory}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nhập tên danh mục"
                        className="w-full p-2 border rounded-md mb-4"
                        required
                    />
                </form>
            </Modal>
            <Header title="Chỉnh sửa danh mục" goBack={true} />
            <div className="flex justify-between items-center border-b pb-2 mx-4 mt-24">
                <LabelWithIcon title="Thêm" iconPath="/assets/plus.png" onClick={() => setIsModalOpen(true)} />
            </div>
            <div className='pt-[10px] pb-[10px] bg-gray-100 mt-4 bg-gray-100'>

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={category.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                        <div className="bg-white rounded-md p-2 bg-gray-100">
                            {category.map((item) => (
                                <SortableItem key={item.id} item={item} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
            <NavBar page='orders' />
        </>
    );
};

const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

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
            <div className="flex items-center space-x-3">
                <Image src="/assets/menu.png" alt="Drag" width={20} height={20} />
                <div>
                    <p className="font-semibold">{item.title}</p>
                </div>
            </div>
        </div>
    );
};

export default Page;
