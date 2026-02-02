import { ChevronDown, Store, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const StoreSelector = ({ stores, selectedStore, onStoreChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedStoreData = selectedStore === 'all' 
    ? { name: 'All Stores', location: 'All Locations' }
    : stores.find(s => s.store_id === parseInt(selectedStore)) || { name: 'Select Store', location: '' };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-foreground/20 transition-colors min-w-[240px]"
      >
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
          <Store className="w-4 h-4 text-foreground" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-foreground">{selectedStoreData.name}</p>
          <p className="text-xs text-muted-foreground">{selectedStoreData.location}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant-lg z-50 overflow-hidden animate-fade-in">
          {/* All Stores Option */}
          <button
            onClick={() => {
              onStoreChange('all');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors ${
              selectedStore === 'all' ? 'bg-secondary' : ''
            }`}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">All Stores</p>
              <p className="text-xs text-muted-foreground">View aggregate data</p>
            </div>
          </button>

          <div className="h-px bg-border" />

          {/* Individual Stores */}
          {stores.map((store) => (
            <button
              key={store.store_id}
              onClick={() => {
                onStoreChange(store.store_id.toString());
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors ${
                selectedStore === store.store_id.toString() ? 'bg-secondary' : ''
              }`}
            >
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{store.name}</p>
                <p className="text-xs text-muted-foreground">{store.location}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreSelector;
