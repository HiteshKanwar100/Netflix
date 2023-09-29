import React from "react";

interface MobileProps{
    visible ?: boolean
}

const MobileMenu : React.FC<MobileProps> = ({visible}) => {
    if(!visible){
        return null;
    }

    return (
        <div className="bg-black w-56 flex flex-col absolute left-0 top-8 py-5 border-2 border-gray-800">
            <div className="flex flex-col gap-4">
                <div className="text-white px-3 text-center hover:underline">Home</div>
                <div className="text-white px-3 text-center hover:underline">Series</div>
                <div className="text-white px-3 text-center hover:underline">Films</div>
                <div className="text-white px-3 text-center hover:underline">New & Popular</div>
                <div className="text-white px-3 text-center hover:underline">My List</div>
                <div className="text-white px-3 text-center hover:underline">Browse by Languages</div>
            </div>
        </div>
    );

}

export default MobileMenu;