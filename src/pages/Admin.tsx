import { DashboardLayout } from '../components/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { 
  Users, 
  DollarSign, 
  Activity, 
  ShieldCheck,
  Search,
  Zap,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { cn } from '../lib/utils'

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        <header>
          <div className="flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Administrator Access</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        </header>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard label="Total Users" value="1,240" trend="+12" icon={<Users className="h-5 w-5 text-primary" />} />
          <AdminStatCard label="Monthly Revenue" value="$4,850" trend="+$840" icon={<DollarSign className="h-5 w-5 text-success" />} />
          <AdminStatCard label="AI API Usage" value="14.2k" trend="72%" icon={<Activity className="h-5 w-5 text-accent" />} />
          <AdminStatCard label="Active Subscriptions" value="284" trend="+8" icon={<ShieldCheck className="h-5 w-5 text-secondary" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management Table */}
          <Card className="lg:col-span-2 glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
              <CardTitle className="text-lg font-bold">User Management</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10 bg-white/5 border-white/10 h-9 rounded-lg" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">User</th>
                      <th className="px-6 py-4 font-bold">Plan</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Joined</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Alex Rivera', email: 'alex@example.com', plan: 'Pro', status: 'Active', joined: '2 days ago' },
                      { name: 'Sarah Chen', email: 'sarah@example.com', plan: 'Free', status: 'Active', joined: '1 week ago' },
                      { name: 'Marcus Miller', email: 'marcus@example.com', plan: 'Pro', status: 'Canceled', joined: 'Mar 12' },
                    ].map((user, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-sm">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            user.plan === 'Pro' ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
                          )}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "h-2 w-2 rounded-full inline-block mr-2",
                            user.status === 'Active' ? "bg-success" : "bg-error"
                          )} />
                          <span className="text-xs text-white">{user.status}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">{user.joined}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* System Logs / AI Logs */}
          <Card className="glass-card border-white/5">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="text-lg font-bold">AI Request Logs</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {[
                { type: 'Analysis', user: 'Alex R.', time: '2m ago', tokens: '420' },
                { type: 'OCR', user: 'Sarah C.', time: '14m ago', tokens: '150' },
                { type: 'Summary', user: 'Marcus M.', time: '1h ago', tokens: '890' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{log.type}</p>
                      <p className="text-[10px] text-muted-foreground">{log.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white">{log.tokens} tokens</p>
                    <p className="text-[10px] text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-xl text-xs h-9 mt-4">
                View All Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const AdminStatCard = ({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) => (
  <Card className="glass-card border-white/5 p-6 relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="flex items-center text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
        <ArrowUpRight className="h-3 w-3 mr-0.5" />
        {trend}
      </div>
    </div>
  </Card>
)

export default AdminDashboard
