import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Sidebar() {
  const { signOut } = useAuthStore();

  const links = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/bookings', icon: <CalendarCheck size={20} />, label: 'Bookings' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Hotel Admin</h1>
      </div>
      <nav className="mt-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 ${
                isActive ? 'bg-gray-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 w-full mt-auto"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}