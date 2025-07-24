import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

interface HeaderProps {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Task Manager
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
