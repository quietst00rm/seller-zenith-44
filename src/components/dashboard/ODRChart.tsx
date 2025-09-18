import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jun', odr: 0.35 },
  { month: 'Jul', odr: 0.41 },
  { month: 'Aug', odr: 0.30 },
  { month: 'Sep', odr: 0.27 },
];

export function ODRChart() {
  return (
    <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        ODR Trend (Last 90 Days)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Line 
              type="monotone" 
              dataKey="odr" 
              stroke="hsl(var(--primary-glow))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary-glow))', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'hsl(var(--primary-glow))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}