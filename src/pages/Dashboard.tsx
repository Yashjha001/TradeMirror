import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  Zap, 
  BrainCircuit, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  History
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { useAuthStore } from '@/store/useAuthStore'

const data = [
  { name: 'Mon', pnl: 400 },
  { name: 'Tue', pnl: -300 },
  { name: 'Wed', pnl: 200 },
  { name: 'Thu', pnl: 1200 },
  { name: 'Fri', pnl: -500 },
  { name: 'Sat', pnl: 800 },
  { name: 'Sun', pnl: 1500 },
]

const MetricCard = ({ title, value, subvalue, icon, color, trend }: { 
  title: string, 
  value: string, 
  subvalue?: string, 
  icon: React.ReactNode, 
  color: string,
  trend?: { value: string, up: boolean }
}) => (
  <Card className="glass-card border-white/5 hover:border-white/10 transition-all overflow-hidden relative group">
    <div className={`absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20`}>
      {icon}
    </div>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
      <div className="flex items-center space-x-2">
        {trend && (
          <div className={cn("flex items-center text-xs font-semibold", trend.up ? "text-success" : "text-error")}>
            {trend.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {trend.value}
          </div>
        )}
        {subvalue && <p className="text-xs text-muted-foreground">{subvalue}</p>}
      </div>
    </CardContent>
  </Card>
)

import { cn } from '@/lib/utils'

const Dashboard = () => {
  const { profile } = useAuthStore()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {profile?.full_name?.split(' ')[0] || 'Trader'}!</h1>
          <p className="text-muted-foreground">Here's how your trading performance looks this week.</p>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total PnL" 
            value="+$2,450.00" 
            trend={{ value: "12.5% vs last week", up: true }}
            icon={<TrendingUp className="h-8 w-8" />}
            color="success"
          />
          <MetricCard 
            title="Win Rate" 
            value="64.2%" 
            subvalue="Last 30 trades"
            trend={{ value: "2.1%", up: true }}
            icon={<Percent className="h-8 w-8" />}
            color="primary"
          />
          <MetricCard 
            title="Avg. Risk/Reward" 
            value="1:2.4" 
            subvalue="Target: 1:3.0"
            icon={<Target className="h-8 w-8" />}
            color="secondary"
          />
          <MetricCard 
            title="Discipline Score" 
            value="88/100" 
            trend={{ value: "5%", up: false }}
            icon={<BrainCircuit className="h-8 w-8" />}
            color="accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equity Curve */}
          <Card className="lg:col-span-2 glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Profit & Loss Curve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4DA3FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4DA3FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#92A0B8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#92A0B8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111B2E', 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderRadius: '12px',
                        color: '#E8EDF7'
                      }}
                      itemStyle={{ color: '#4DA3FF' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pnl" 
                      stroke="#4DA3FF" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPnl)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Quick Insights */}
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BrainCircuit className="h-5 w-5 mr-2 text-accent" />
                AI Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-sm font-medium text-accent mb-1 flex items-center">
                  <Zap className="h-4 w-4 mr-1" /> Pattern Detected
                </p>
                <p className="text-xs text-muted-foreground">
                  You tend to lose more trades during London open. Consider tightening your entry criteria before 8:00 AM UTC.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Common Emotion</span>
                  <span className="text-sm font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">Confident</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Setup</span>
                  <span className="text-sm font-medium px-2 py-0.5 rounded bg-green-500/20 text-green-400">Fib Retracement</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Biggest Mistake</span>
                  <span className="text-sm font-medium px-2 py-0.5 rounded bg-red-500/20 text-red-400">Revenge Trading</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-xl h-10">
                Full AI Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trades Table (Simplified) */}
        <Card className="glass-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <History className="h-5 w-5 mr-2 text-primary" />
              Recent Journal Entries
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/journal" className="text-primary hover:text-primary/80">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-muted-foreground text-sm">
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Setup</th>
                    <th className="pb-3 font-medium">PnL</th>
                    <th className="pb-3 font-medium">Result</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { symbol: 'BTC/USDT', type: 'Long', setup: 'Breakout', pnl: '+$450.00', result: 'Win', date: '2 hours ago' },
                    { symbol: 'EUR/USD', type: 'Short', setup: 'Double Top', pnl: '-$120.00', result: 'Loss', date: 'Yesterday' },
                    { symbol: 'TSLA', type: 'Long', setup: 'Gap Fill', pnl: '+$890.00', result: 'Win', date: 'Apr 3' },
                  ].map((trade, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 font-semibold text-white">{trade.symbol}</td>
                      <td className="py-4 text-muted-foreground">{trade.type}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 rounded-lg bg-white/5 text-xs border border-white/10">{trade.setup}</span>
                      </td>
                      <td className={cn("py-4 font-bold", trade.pnl.startsWith('+') ? "text-success" : "text-error")}>
                        {trade.pnl}
                      </td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-lg text-xs font-bold",
                          trade.result === 'Win' ? "bg-success/20 text-success" : "bg-error/20 text-error"
                        )}>
                          {trade.result}
                        </span>
                      </td>
                      <td className="py-4 text-muted-foreground text-sm">{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
