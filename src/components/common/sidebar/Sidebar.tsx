"use client";

import React, { useEffect, useState } from "react";
import { SIDE_BAR_OPTIONS } from "@/constants";
import { usePathname } from "next/navigation";
import SidebarOption from "./sidbar_option/SidebarOption";

function Sidebar() {
  const pathName = usePathname();

  const [activePage, setActivePage] = useState<string>(pathName);

  useEffect(() => {
    if (pathName.includes("cars")) {
      setActivePage(SIDE_BAR_OPTIONS[0].route);
    }
    if (pathName.includes("brands")) {
      setActivePage(SIDE_BAR_OPTIONS[1].route);
    }
    if (pathName.includes("carModels")) {
      setActivePage(SIDE_BAR_OPTIONS[2].route);
    }
  }, [pathName]);

  return (
    <div className="h-screen flex flex-col items-center p-3  sticky top-0 max-w-[90px] min-w-[90px] md:max-w-[268px] md:min-w-[268px] shadow-lg">
      {SIDE_BAR_OPTIONS.map((option, index) => (
        <SidebarOption
          setActivePageFunc={setActivePage}
          key={option.id}
          icon={option.icon}
          name={option.name}
          isActive={activePage == option.route}
          route={option.route}
        />
      ))}
    </div>
  );
}

export default Sidebar;
