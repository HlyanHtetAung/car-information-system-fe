"use client";

type SidebarOptionProps = {
  icon: any;
  name: string;
  isActive: boolean;
  route: string;
  setActivePageFunc: (route: string) => void;
};

import { useRouter } from "next/navigation";

function SidebarOption({
  icon: Icon,
  name,
  isActive,
  route,
  setActivePageFunc,
}: SidebarOptionProps) {
  const router = useRouter();

  const handleNavigate = () => {
    setActivePageFunc(route);
    router.push(route);
  };

  return (
    <div
      onClick={handleNavigate}
      className={`w-full flex items-center gap-2 mb-[10px] px-[24px] py-[12px] rounded-md cursor-pointer ${
        isActive ? "bg-gray-400" : "bg-transparent"
      } 
      `}
    >
      <Icon className={`${isActive ? "text-white" : "text-black"} `} />
      <p
        className={`text-[14px] hidden md:block ${
          isActive ? "font-[500] text-white" : "font-[300] text-black"
        }`}
      >
        {name}
      </p>
    </div>
  );
}

export default SidebarOption;
