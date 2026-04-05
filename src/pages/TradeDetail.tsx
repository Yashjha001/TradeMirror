import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Trash2, 
  Sparkles, 
  Smile, 
  AlertTriangle, 
  BookOpen,
  History,
  TrendingUp,
  TrendingDown,
  Target,
  Zap
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'
import { cn, formatDate, formatCurrency } from '@/lib/utils'

const TradeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [trade, setTrade] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchTrade()
    }
  }, [id])

  const fetchTrade = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('trade_entries')
      .select('*')
      .eq('id', id)
      .single()

    if (!error && data) {
      setTrade(data)
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!trade) return
    const confirmed = window.confirm('Are you sure you want to delete this entry?')
    if (!confirmed) return

    const { error } = await supabase
      .from('trade_entries')
      .delete()
      .eq('id', trade.id)

    if (error) {
      toast({ variant: 'destructive', title: 'Error deleting trade', description: error.message })
    } else {
      toast({ title: 'Trade deleted' })
      navigate('/journal')
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!trade) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Trade not found</h2>
          <Button onClick={() => navigate('/journal')} className="mt-4">Back to Journal</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/journal')} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-3xl font-bold tracking-tight">{trade.symbol}</h1>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  trade.result === 'win' ? "bg-success/20 text-success" : 
                  trade.result === 'loss' ? "bg-error/20 text-error" : "bg-muted/20 text-muted"
                )}>
                  {trade.result}
                </span>
              </div>
              <p className="text-muted-foreground text-sm flex items-center">
                <History className="h-3.5 w-3.5 mr-1.5" />
                {trade.setup_type} • {formatDate(trade.trade_date)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-error/20 hover:bg-error/5 text-error rounded-xl" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatsBox label="Entry Price" value={formatCurrency(trade.entry_price)} icon={<TrendingUp className="h-4 w-4 text-primary" />} />
              <StatsBox label="Exit Price" value={trade.exit_price ? formatCurrency(trade.exit_price) : '-'} icon={<TrendingDown className="h-4 w-4 text-secondary" />} />
              <StatsBox label="Timeframe" value={trade.timeframe || '-'} icon={<Zap className="h-4 w-4 text-yellow-400" />} />
              <StatsBox label="PnL" value={trade.pnl ? formatCurrency(trade.pnl) : '-'} icon={<Target className="h-4 w-4 text-accent" />} />
            </div>

            {/* Reflections */}
            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" /> Pre-Trade Reflection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  "{trade.pre_trade_reflection || 'No reflection provided.'}"
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-secondary" /> Post-Trade Reflection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  "{trade.post_trade_reflection || 'No reflection provided.'}"
                </p>
              </CardContent>
            </Card>

            {/* Screenshots (Placeholder) */}
            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-accent" /> Screenshots
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <p className="text-muted-foreground text-sm">No screenshots uploaded for this trade.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Psychology & AI Analysis */}
          <div className="space-y-8">
            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-accent" /> AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <p className="text-sm font-medium text-accent mb-2">Psychological Insight</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Based on your pre-trade reflection, you were showing signs of FOMO. 
                    However, your exit was disciplined. Good job sticking to the target 
                    despite initial anxiety.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Discipline Level</span>
                    <span className="text-xs font-bold text-success">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Execution Quality</span>
                    <span className="text-xs font-bold text-primary">Good</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Smile className="h-5 w-5 mr-2 text-yellow-400" /> Emotions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {trade.emotions?.map((emotion: string) => (
                    <span key={emotion} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                      {emotion}
                    </span>
                  ))}
                  {(!trade.emotions || trade.emotions.length === 0) && <p className="text-xs text-muted-foreground">No emotions tagged.</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-error" /> Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {trade.mistakes?.map((mistake: string) => (
                    <span key={mistake} className="px-3 py-1.5 rounded-full bg-error/10 border border-error/10 text-xs text-error">
                      {mistake}
                    </span>
                  ))}
                  {(!trade.mistakes || trade.mistakes.length === 0) && <p className="text-xs text-muted-foreground">No mistakes recorded. Perfect trade!</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-success" /> Key Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                {trade.lessons?.map((lesson: string, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-white leading-relaxed">{lesson}</p>
                  </div>
                ))}
                {(!trade.lessons || trade.lessons.length === 0) && <p className="text-xs text-muted-foreground">No lessons recorded yet.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const StatsBox = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</span>
      {icon}
    </div>
    <div className="text-lg font-bold text-white truncate">{value}</div>
  </div>
)

export default TradeDetail
