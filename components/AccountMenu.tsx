import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  const { data } = useCurrentUser();

  const images = [
    "/images/default-blue.png",
    "/images/default-red.png",
    "/images/default-slate.png",
    "/images/default-green.png",
    "/images/Itachi.jpg",
    "/images/animatedboy.jpg",
    "/images/onePiece.jpg",
    "/images/pxfuel.jpg",
    "/images/spiderman.jpg",
    "/images/Itachi.jpg",
  ];
  const imgSrc = images[Math.floor(Math.random() * 10)];

  return (
    <div className="bg-black w-56 flex flex-col absolute right-0 top-14 py-5 border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src={imgSrc} alt="profile-img" />
          <p className="text-white text-sm group-hover/item:underline">
            {" "}
            {data?.name}{" "}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 my-4 h-px" />
        <div
          onClick={() => signOut()}
          className="px-3 text-white text-sm text-center hover:underline"
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
