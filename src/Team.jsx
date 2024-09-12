import React from "react";


export default function Team({name, description, rep, onMouseEnter, onMouseLeave, zoomState} ){
    return(
        <div className={`grid grid-rows-8 p-5 pb-10 border-2 max-h-80 rounded-lg bg-black justify-items-center text-center transition-all even:mt-10 ${zoomState} `}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
            <img  className="max-w-36 row-span-5 rounded-full"src={rep} alt="random" />
            <div className="font-['Poppins']">
                <h3 className="text-white font-medium mt-5 ">{name}</h3>
                <p className="flex items-center justify-center text-white">{description}</p>
            </div>
        </div>
    );
}