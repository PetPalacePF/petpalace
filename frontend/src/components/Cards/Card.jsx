import { NavLink } from "react-router-dom";

export const Card = () => {
  return (
    <NavLink to="/detail">
      <div className="h-[400px] w-[300px] flex-shrink-0 cursor-pointer">
        <div className="mb-4 relative h-[300px] w-[300px] bg-black">
          <span className="absolute top-3 left-4 border border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100">
            Category
          </span>
        </div>
        <div className="px-4 flex gap-4">
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-bold text-slate-700 leading-7 whitespace-normal">
              Product Namejjps
            </h3>
            <div className="flex gap-2">
              <p className="text-sm text-slate-800 font-bold">Price</p>
              <p className="text-sm text-gray-800 font-semibold">$1000</p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
