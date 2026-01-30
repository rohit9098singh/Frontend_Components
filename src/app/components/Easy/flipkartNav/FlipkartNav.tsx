"use client";
import React, { useState } from "react";

type MenuType = "men" | "women";
type CategoryData = Record<string, string[]>;
type NavData = Record<MenuType, CategoryData>;

const NAV_DATA: NavData = {
    men: {
        Topwear: ["T-Shirts", "Shirts", "Jackets", "Hoodies"],
        Bottomwear: ["Jeans", "Trousers", "Shorts"],
        Footwear: ["Sneakers", "Formal Shoes"],
        Brands: ["Nike", "Puma", "Adidas"]
    },
    women: {
        Ethnic: ["Kurtas", "Sarees", "Lehengas"],
        Western: ["Dresses", "Tops", "Jeans"],
        Footwear: ["Heels", "Flats"],
        Brands: ["Zara", "H&M", "Biba"]
    }
};

const FlipkartNav = () => {
    const [activeMenu, setActiveMenu] = useState<MenuType | null>(null);

    return (
        <div className="min-h-screen w-full bg-green-100">
            <div className="h-[64px] bg-gray-200 max-w-7xl mx-auto rounded-md p-4 flex justify-center items-center gap-6">
                <div onMouseEnter={() => setActiveMenu("men")}>Men</div>
                <div onMouseEnter={() => setActiveMenu("women")}>Women</div>
            </div>

            {activeMenu && (
                <div
                    className="mega-menu bg-white shadow-lg w-[500px] flex items-center justify-center mx-auto"
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    <MegaMenuContent data={NAV_DATA[activeMenu]} />
                </div>
            )}
        </div>
    );
};

export default FlipkartNav;




const MegaMenuContent = ({ data }: { data: CategoryData }) => {
    return (
        <div className="grid grid-cols-4 gap-6 p-6 max-w-md">
            {Object.entries(data).map(([category, items]) => (
                <div key={category}>
                    <h4 className="font-semibold mb-2">{category}</h4>
                    <ul className="space-y-1">
                        {items.map(item => (
                            <li key={item} className="text-sm cursor-pointer hover:text-blue-600">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}