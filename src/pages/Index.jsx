import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import StoreSelector from '../components/StoreSelector';
import BrandHealth from '../components/BrandHealth';
import ProductFeedback from '../components/ProductFeedback';
import SizeFitChart from '../components/SizeFitChart';
import StyleColorTrends from '../components/StyleColorTrends';
import CustomerList from '../components/CustomerList';
import Demographics from '../components/Demographics';
import {
  stores,
  getReviewsByStore,
  calculateBrandHealth,
  calculateSizeFit,
  extractProductFeedback,
  extractColorMentions,
  extractFabricFeedback,
} from '../data/mockData';

const Index = () => {
  const [activeSection, setActiveSection] = useState('health');
  const [selectedStore, setSelectedStore] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get filtered reviews based on selected store
  const reviews = useMemo(() => getReviewsByStore(selectedStore), [selectedStore]);

  // Calculate all metrics
  const brandHealth = useMemo(() => calculateBrandHealth(reviews), [reviews]);
  const sizeFitData = useMemo(() => calculateSizeFit(reviews), [reviews]);
  const productFeedback = useMemo(() => extractProductFeedback(reviews), [reviews]);
  const colorMentions = useMemo(() => extractColorMentions(reviews), [reviews]);
  const fabricFeedback = useMemo(() => extractFabricFeedback(reviews), [reviews]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'health':
        return (
          <div className="space-y-8">
            <BrandHealth data={brandHealth} />
            <CustomerList reviews={reviews.slice(0, 5)} />
          </div>
        );
      case 'feedback':
        return <ProductFeedback products={productFeedback} />;
      case 'size':
        return <SizeFitChart data={sizeFitData} />;
      case 'style':
        return <StyleColorTrends colors={colorMentions} fabrics={fabricFeedback} />;
      case 'demographics':
        return <Demographics reviews={reviews} />;
      default:
        return <BrandHealth data={brandHealth} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Monitor your brand's performance and customer feedback
              </p>
            </div>

            <div className="flex items-center gap-4">
              <StoreSelector
                stores={stores}
                selectedStore={selectedStore}
                onStoreChange={setSelectedStore}
              />
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2.5 rounded-lg border border-border bg-card hover:bg-secondary transition-colors disabled:opacity-50"
                aria-label="Refresh data"
              >
                <RefreshCw
                  className={`w-4 h-4 text-foreground ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 Luxe Fashion Analytics. All rights reserved.</p>
            <p>
              Data source: <span className="font-medium text-foreground">n8n Integration</span> •
              <span className="ml-2">Last updated: Just now</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
