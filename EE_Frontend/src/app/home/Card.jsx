import Link from 'next/link';
import React from 'react';

const Card = ({ url, titule, context }) => {
  return (
    <div className="w-[280px] rounded-lg overflow-hidden shadow-md h-[560px] bg-white m-auto">
      <img className="w-full transition-transform duration-500 hover:scale-110" src={`./Img/${url}`} alt={titule} />
      <div className="text-black px-6 pt-3 pb-2 items-center flex flex-col gap-2 justify-between h-[355px]">
        <div className="mb-2">
          <p className="text-primary font-[800] text-[20px] mb-2 mt-1">{titule}</p>
          <p className="font-[400] text-[14px] text-balance">{context}</p>
        </div>
        <Link href="/blog" className="block w-fit cursor-pointer bg-primary text-white p-1 px-4 rounded-lg ">
          Conoce más
        </Link>
      </div>
    </div>
  );
};

export default Card;
