import { 
  LayoutDashboard, 
  MessageSquare, 
  Ruler, 
  Palette, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'health', label: 'Overall Health', icon: LayoutDashboard },
  { id: 'feedback', label: 'Product Feedback', icon: MessageSquare },
  { id: 'size', label: 'Size & Fit', icon: Ruler },
  { id: 'style', label: 'Style/Color Trends', icon: Palette },
  { id: 'demographics', label: 'Demographics', icon: Users },
];

const Sidebar = ({ activeSection, onSectionChange, isCollapsed, onToggleCollapse }) => {
  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border
        transition-all duration-300 ease-in-out z-50
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LF</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">Luxe Fashion</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full nav-item
                ${isActive ? 'nav-item-active' : ''}
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            Analytics Dashboard v1.0
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
