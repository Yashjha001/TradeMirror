import { DashboardLayout } from '../components/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  BrainCircuit, 
  Smile,
  AlertTriangle,
  Calendar
} from 'lucide-react'
import { cn } from '../lib/utils'

const monthlyData = [
  { name: 'Jan', profit: 1200, loss: 400 },
  { name: 'Feb', profit: 1800, loss: 800 },
  { name: 'Mar', profit: 2200, loss: 1200 },
  { name: 'Apr', profit: 3000, loss: 900 },
]

const setupData = [
  { name: 'Breakout', value: 45 },
  { name: 'Retest', value: 25 },
  { name: 'Mean Rev', value: 20 },
  { name: 'News', value: 10 },
]

const emotionData = [
  { name: 'Confident', count: 18, color: '#4DA3FF' },
  { name: 'Anxious', count: 12, color: '#7C83FF' },
  { name: 'Greedy', count: 5, color: '#B58CFF' },
  { name: 'Disciplined', count: 25, color: '#34D399' },
]

const mistakeData = [
  { name: 'FOMO', value: 8 },
  { name: 'Early Exit', value: 12 },
  { name: 'Oversized', value: 4 },
  { name: 'Revenge', value: 3 },
]

const COLORS = ['#4DA3FF', '#7C83FF', '#B58CFF', '#34D399', '#FBBF24', '#F87171']

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your trading behavior and performance metrics.</p>
        </header>

        {/* Top row: Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Profit Factor" value="1.84" subtext="+0.2 from last month" icon={<TrendingUp className="text-success h-5 w-5" />} />
          <StatCard label="Avg. Win" value="$420.00" subtext="Top win: $1,250" icon={<TrendingUp className="text-primary h-5 w-5" />} />
          <StatCard label="Avg. Loss" value="$210.00" subtext="Max loss: $450" icon={<TrendingDown className="text-error h-5 w-5" />} />
          <StatCard label="Expectancy" value="$115.50" subtext="Per trade" icon={<Target className="text-accent h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profit vs Loss Bar Chart */}
          <Card className="glass-card border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" /> Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#92A0B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#92A0B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#111B2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    />
                    <Bar dataKey="profit" fill="#34D399" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="loss" fill="#F87171" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Setup Distribution */}
          <Card className="glass-card border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2 text-accent" /> Setup Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={setupData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {setupData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111B2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold">100%</span>
                  <span className="text-xs text-muted-foreground uppercase">Total Trades</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emotions Chart */}
          <Card className="glass-card border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Smile className="h-5 w-5 mr-2 text-yellow-400" /> Emotional Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {emotionData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.count} trades</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${(item.count / 60) * 100}%`, backgroundColor: item.color }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mistake Heatmap (Simplified as List) */}
          <Card className="lg:col-span-2 glass-card border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-error" /> Mistake Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mistakeData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#92A0B8" fontSize={12} width={80} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111B2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                      <Bar dataKey="value" fill="#F87171" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-error/10 border border-error/20">
                    <h4 className="text-sm font-bold text-error mb-1">Critical Insight</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      "Early Exit" is your most frequent mistake. It has cost you an estimated <b>$1,420</b> in potential profits this month.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <h4 className="text-sm font-bold text-primary mb-1">Improvement Plan</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Set a "hands-off" rule for 15 minutes after entry to avoid premature exits.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const StatCard = ({ label, value, subtext, icon }: { label: string, value: string, subtext: string, icon: React.ReactNode }) => (
  <Card className="glass-card border-white/5 hover:border-white/10 transition-all p-6">
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <p className="text-xs text-muted-foreground">{subtext}</p>
  </Card>
)

import { BarChart3 } from 'lucide-react'

export default Analytics
