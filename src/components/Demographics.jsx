import { Users, MapPin, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const Demographics = ({ reviews }) => {
  // Calculate store distribution
  const storeDistribution = reviews.reduce((acc, review) => {
    const storeId = review.store_id;
    acc[storeId] = (acc[storeId] || 0) + 1;
    return acc;
  }, {});

  const storeNames = {
    1: 'NYC',
    2: 'LA',
    3: 'Miami',
    4: 'Chicago',
  };

  const pieData = Object.entries(storeDistribution).map(([id, count]) => ({
    name: storeNames[id] || `Store ${id}`,
    value: count,
  }));

  const COLORS = ['#18181b', '#10B981', '#71717a', '#f59e0b'];

  // Calculate rating distribution
  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const totalReviews = reviews.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Demographics & Insights</h2>
        <p className="text-muted-foreground">Customer distribution and engagement patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Distribution */}
        <div className="dashboard-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Reviews by Location</h3>
          </div>

          {pieData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No data available</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Rating Distribution */}
        <div className="dashboard-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Rating Distribution</h3>
          </div>

          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-12">
                    <span className="font-medium">{rating}</span>
                    <span className="text-amber-400">★</span>
                  </div>
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium">{count}</span>
                    <span className="text-xs text-muted-foreground ml-1">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="dashboard-card p-5 text-center">
          <Users className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-2xl font-semibold">{totalReviews}</p>
          <p className="text-sm text-muted-foreground">Total Reviewers</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <MapPin className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-2xl font-semibold">{Object.keys(storeDistribution).length}</p>
          <p className="text-sm text-muted-foreground">Active Locations</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <TrendingUp className="w-6 h-6 text-positive mx-auto mb-2" />
          <p className="text-2xl font-semibold">{ratingDistribution[5] || 0}</p>
          <p className="text-sm text-muted-foreground">5-Star Reviews</p>
        </div>
        <div className="dashboard-card p-5 text-center">
          <TrendingUp className="w-6 h-6 text-destructive mx-auto mb-2 rotate-180" />
          <p className="text-2xl font-semibold">{(ratingDistribution[1] || 0) + (ratingDistribution[2] || 0)}</p>
          <p className="text-sm text-muted-foreground">Low Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
