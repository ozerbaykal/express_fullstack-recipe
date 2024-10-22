import { NavLink } from "react-router-dom";
import { links } from "../constants";

const SideBar = () => {
  return (
    <aside className=" flex flex-col h-screen justify-between items-center py-6 md:px-3 max-md:py-1 max-md:gap-20 max-md:justify-normal ">
      <img
        src="/logo.jpg"
        alt="logo"
        className="max-w-[120px] md:max-w-[200px]"
      />
      <nav className="flex flex-col gap-16">
        {links.map((i, index) => (
          <NavLink
            key={index}
            className="flex gap-4 items-center text-lg text-orange-900 hover:bg-orange-100 p-2 rounded-full transition hover:scale-110"
            to={i.path}
          >
            <span className="max-md:text-3xl ">{i.icon}</span>
            <span className="max-md:hidden">{i.title}</span>
          </NavLink>
        ))}
      </nav>
      <div className="flex flex-col gap-2 max-md:hidden my-2">
        <p className="font-semibold">Günlük Haberleri al</p>
        <button className="bg-orange-300 rounded-lg hover:bg-orange-500">
          Abone Ol
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
