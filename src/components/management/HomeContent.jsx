import React from "react";
import IconCard from "../IconCard"; // Assuming IconCard is in the same directory

const icons = [
  { href: "/management/orders", src: "/assets/user.png", label: "Đơn hàng" },
  { href: "/management/menu", src: "/assets/user.png", label: "Thực đơn" },
  // { href: "/page3", src: "/assets/user.png", label: "Đánh giá" },
  // { href: "/page4", src: "/assets/user.png", label: "Báo cáo" },
  { href: "/management/account", src: "/assets/user.png", label: "Thông tin cửa hàng" },
  { href: "/page5", src: "/assets/user.png", label: "Chất lượng dịch vụ" },
  { href: "/management/staffs", src: "/assets/user.png", label: "Quản lý nhân viên" },
  { href: "/page8", src: "/assets/user.png", label: "Trung tâm trợ giúp" },
];

const HomeContent = () => {
  return (
    <div className="p-5 shadow-md mb-48 mt-12">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {icons.map((icon, index) => (
          <IconCard
            key={index}
            href={icon.href}
            src={icon.src}
            label={icon.label}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
