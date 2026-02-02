import { Palette, Sparkles, CircleDot } from 'lucide-react';

const getColorClass = (colorName) => {
  const colorMap = {
    'Navy Blue': 'bg-blue-900',
    'Black': 'bg-black',
    'Beige': 'bg-amber-100',
    'Charcoal Grey': 'bg-gray-600',
    'Ivory': 'bg-amber-50 border border-border',
    'Olive Green': 'bg-green-700',
    'Burgundy': 'bg-red-900',
    'Cream': 'bg-amber-50 border border-border',
    'Coral': 'bg-orange-400',
    'White': 'bg-white border border-border',
    'Forest Green': 'bg-green-800',
    'Camel': 'bg-amber-600',
  };
  return colorMap[colorName] || 'bg-gray-400';
};

const getFabricSentiment = (quality) => {
  const positive = ['exceptional', 'high', 'top-notch', 'luxurious', 'sustainable', 'breathable', 'premium', 'excellent'];
  const negative = ['cheap', 'scratchy', 'thin'];
  
  if (positive.includes(quality)) return 'positive';
  if (negative.includes(quality)) return 'negative';
  return 'neutral';
};

const StyleColorTrends = ({ colors, fabrics }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Style & Color Trends</h2>
        <p className="text-muted-foreground">Popular colors and fabric quality feedback from reviews</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Cloud */}
        <div className="dashboard-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Mentioned Colors</h3>
          </div>

          {colors.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No color mentions found</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="tag-cloud-item group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className={`w-4 h-4 rounded-full ${getColorClass(color.name)} mr-2 flex-shrink-0`} />
                  <span>{color.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground group-hover:text-primary-foreground">
                    ({color.count})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fabric Quality */}
        <div className="dashboard-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Fabric Quality Feedback</h3>
          </div>

          {fabrics.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No fabric quality mentions found</p>
          ) : (
            <div className="space-y-3">
              {fabrics.map((fabric, index) => {
                const sentiment = getFabricSentiment(fabric.name);
                const sentimentClass = 
                  sentiment === 'positive' ? 'text-positive' :
                  sentiment === 'negative' ? 'text-destructive' :
                  'text-amber-600';
                const bgClass = 
                  sentiment === 'positive' ? 'bg-positive/10' :
                  sentiment === 'negative' ? 'bg-destructive/10' :
                  'bg-amber-100';

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CircleDot className={`w-4 h-4 ${sentimentClass}`} />
                      <span className="font-medium capitalize">{fabric.name}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${bgClass} ${sentimentClass}`}>
                      {fabric.count} {fabric.count === 1 ? 'mention' : 'mentions'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleColorTrends;
