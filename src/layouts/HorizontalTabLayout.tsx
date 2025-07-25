import { useEffect, useState } from "react";

export interface TabItem {
  id: string;
  name: string;
  content: React.ReactNode;
  icon?: string | React.ReactNode;
}

interface HorizontalTabLayoutProps {
  tabs: TabItem[];
  defaultTabId?: string;
  queryParamName?: string;
}

const HorizontalTabLayout = ({
  tabs,
  defaultTabId,
  queryParamName = "tab",
}: HorizontalTabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || tabs[0]?.id
  );

  const getActiveTabFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get(queryParamName);
    return tab;
  };
  const handleToggleTab = (newName: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(queryParamName, newName);
    const newURL = window.location.pathname + "?" + searchParams.toString();
    window.history.replaceState({}, "", newURL);
    setActiveTab(newName);
  };

  const initializeTheActiveTab = (tabToActive: string) => {
    const currentActiveTab = getActiveTabFromURL();
    if (currentActiveTab) {
      setActiveTab(currentActiveTab);
    } else {
      handleToggleTab(tabToActive);
    }
  };

  const activateTab = tabs.find((tab) => tab.id === activeTab);
  const DefaultIcon = (
    <svg
      className="w-4 h-4 mr-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  );

  useEffect(() => {
    initializeTheActiveTab(tabs[0].id);
  }, [tabs]);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => handleToggleTab(tab.id)}
                className={`p-4 border-b-2 rounded-t-lg transition-all duration-150 flex ${
                  activateTab?.id === tab.id
                    ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                    : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {tab.icon ?? DefaultIcon}
                <span>{tab.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activateTab?.content ?? (
          <div className="text-center text-sm text-gray-400">
            No content available
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalTabLayout;
