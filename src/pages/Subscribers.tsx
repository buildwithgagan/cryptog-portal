
import { useSubscribers } from "@/hooks/useSubscribers";
import SubscribersHeader from "@/components/subscribers/SubscribersHeader";
import SubscribersFilters from "@/components/subscribers/SubscribersFilters";
import SubscribersList from "@/components/subscribers/SubscribersList";

const Subscribers = () => {
  const {
    filteredSubscribers,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleExport
  } = useSubscribers();

  return (
    <div className="container mx-auto py-6">
      <SubscribersHeader onExport={handleExport} />
      
      <SubscribersFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <SubscribersList subscribers={filteredSubscribers} />
    </div>
  );
};

export default Subscribers;
