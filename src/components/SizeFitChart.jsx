import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Ruler } from 'lucide-react';

const COLORS = {
  'Runs Small': '#ef4444',
  'True to Size': '#10B981',
  'Runs Large': '#f59e0b',
};

const SizeFitChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Size & Fit Intelligence</h2>
          <p className="text-muted-foreground">How customers describe the fit of your products</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Ruler className="w-4 h-4" />
          <span>{total} reviews analyzed</span>
        </div>
      </div>

      <div className="dashboard-card p-6 animate-fade-in">
        {/* Chart */}
        <div className="h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
              barCategoryGap={12}
            >
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={100}
                tick={{ fill: '#71717a', fontSize: 14 }}
              />
              <Bar
                dataKey="percentage"
                radius={[0, 6, 6, 0]}
                barSize={32}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
                <LabelList
                  dataKey="percentage"
                  position="right"
                  formatter={(value) => `${value}%`}
                  style={{ fill: '#18181b', fontWeight: 600, fontSize: 14 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
          {data.map((item) => (
            <div key={item.name} className="text-center">
              <div 
                className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2"
                style={{ backgroundColor: `${COLORS[item.name]}20` }}
              >
                <span 
                  className="text-lg font-bold"
                  style={{ color: COLORS[item.name] }}
                >
                  {item.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Insight */}
        {data[1]?.percentage > 50 && (
          <div className="mt-6 p-4 bg-positive/5 border border-positive/20 rounded-lg">
            <p className="text-sm text-positive font-medium">
              ✓ Great news! Most customers report your products are true to size.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeFitChart;
