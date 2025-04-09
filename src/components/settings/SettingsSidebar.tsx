
interface SettingsSidebarProps {
  navItems: Array<{ id: string; label: string }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSidebar = ({ navItems, activeTab, setActiveTab }: SettingsSidebarProps) => {
  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-muted/30 rounded-lg">
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`px-4 py-3 text-left hover:bg-accent/50 transition-colors ${
                activeTab === item.id ? "bg-muted font-medium" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;
