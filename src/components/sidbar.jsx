import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { GrResources } from "react-icons/gr";
import { GiConfirmed } from "react-icons/gi";
import { AiOutlineTeam } from "react-icons/ai";



const Sidebar = () => {
    return (
        <aside className="w-40 bg-custom-blue text-white p-4 fixed h-full">
            <nav>
                <ul>
                    <li className="mb-4 mt-12">
                        <NavLink
                            to="/home"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-gray-400' : 'hover:text-gray-400'}`}
                            end
                        >
                            <IoMdHome className="w-5 h-5" /> <span>الرئيسية</span>
                        </NavLink>
                    </li>

                    <li className="mb-4">
                        <NavLink
                            to="/requests"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-gray-400' : 'hover:text-gray-400'}`}
                        >
                            <VscGitPullRequestGoToChanges className="w-5 h-5" /> <span>الطلبات</span>
                        </NavLink>
                    </li>

                    <li className="mb-4">
                        <NavLink
                            to="/ccRequest"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-gray-400' : 'hover:text-gray-400'}`}
                        >
                            <GiConfirmed className="w-5 h-5" /> <span>الطلبات</span>
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/profile"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-gray-400' : 'hover:text-gray-400'}`}
                        >
                            <IoSettingsSharp className="w-5 h-5" /> <span>البروفايل</span>
                        </NavLink>
                    </li>

                    <li className="mb-4">
                        <NavLink
                            to="/teams"
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-gray-400' : 'hover:text-gray-400'}`}
                            end
                        >
                            <AiOutlineTeam className="w-5 h-5" /> <span>الفريق</span>
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
