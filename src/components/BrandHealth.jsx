import { Star, MessageSquare, TrendingUp, Smile, Meh, Frown } from 'lucide-react';

const KPICard = ({ icon: Icon, label, value, subtext, iconColor }) => (
  <div className="dashboard-card p-6 animate-fade-in">
    <div className="flex items-start justify-between">
      <div>
        <p className="kpi-label mb-2">{label}</p>
        <p className="kpi-value">{value}</p>
        {subtext && (
          <p className="text-sm text-muted-foreground mt-1">{subtext}</p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const SentimentCard = ({ positive, neutral, negative, total }) => {
  const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;
  const neutralPercent = total > 0 ? Math.round((neutral / total) * 100) : 0;
  const negativePercent = total > 0 ? Math.round((negative / total) * 100) : 0;

  return (
    <div className="dashboard-card p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="kpi-label mb-2">Sentiment Score</p>
          <p className="kpi-value">{positivePercent}%</p>
          <p className="text-sm text-muted-foreground mt-1">Positive reviews</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-positive/10 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-positive" />
        </div>
      </div>

      {/* Sentiment Bar */}
      <div className="space-y-3">
        <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
          <div 
            className="h-full bg-positive transition-all duration-500"
            style={{ width: `${positivePercent}%` }}
          />
          <div 
            className="h-full bg-amber-400 transition-all duration-500"
            style={{ width: `${neutralPercent}%` }}
          />
          <div 
            className="h-full bg-destructive transition-all duration-500"
            style={{ width: `${negativePercent}%` }}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-positive" />
            <span className="text-muted-foreground">Positive</span>
            <span className="font-medium">{positive}</span>
          </div>
          <div className="flex items-center gap-2">
            <Meh className="w-4 h-4 text-amber-500" />
            <span className="text-muted-foreground">Neutral</span>
            <span className="font-medium">{neutral}</span>
          </div>
          <div className="flex items-center gap-2">
            <Frown className="w-4 h-4 text-destructive" />
            <span className="text-muted-foreground">Negative</span>
            <span className="font-medium">{negative}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandHealth = ({ data }) => {
  const { avgRating, totalReviews, sentimentBreakdown } = data;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Brand Health</h2>
        <p className="text-muted-foreground">Overview of your brand's performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          icon={Star}
          label="Average Rating"
          value={avgRating}
          subtext="Out of 5 stars"
          iconColor="bg-amber-100 text-amber-600"
        />
        <KPICard
          icon={MessageSquare}
          label="Total Reviews"
          value={totalReviews}
          subtext="All time"
          iconColor="bg-primary/10 text-primary"
        />
        <SentimentCard
          positive={sentimentBreakdown.positive}
          neutral={sentimentBreakdown.neutral}
          negative={sentimentBreakdown.negative}
          total={totalReviews}
        />
      </div>
    </div>
  );
};

export default BrandHealth;
