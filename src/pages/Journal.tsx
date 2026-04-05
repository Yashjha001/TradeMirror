import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../components/DashboardLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  History,
  Smile,
  AlertTriangle,
  Calendar
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/useAuthStore'
import { cn, formatDate } from '../lib/utils'

const Journal = () => {
  const { user } = useAuthStore()
  const [trades, setTrades] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchTrades()
  }, [user])

  const fetchTrades = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('trade_entries')
      .select('*')
      .order('trade_date', { ascending: false })

    if (!error && data) {
      setTrades(data)
    }
    setIsLoading(false)
  }

  const filteredTrades = trades.filter(trade => 
    trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.setup_type?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Journal Workspace</h1>
            <p className="text-muted-foreground">Review your past trades and track your growth.</p>
          </div>
          <Button asChild variant="gradient" className="rounded-xl px-6 h-11">
            <Link to="/journal/new">
              <Plus className="h-5 w-5 mr-2" />
              New Entry
            </Link>
          </Button>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by symbol or setup..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl focus-visible:ring-primary/50"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none border-white/10 h-11 rounded-xl bg-white/5">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none border-white/10 h-11 rounded-xl bg-white/5">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        {/* Trades List */}
        <div className="space-y-4 pb-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
              <p className="text-muted-foreground">Loading your trades...</p>
            </div>
          ) : filteredTrades.length > 0 ? (
            filteredTrades.map((trade) => (
              <Link key={trade.id} to={`/journal/${trade.id}`}>
                <Card className="glass-card border-white/5 hover:border-primary/30 transition-all group mb-4">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                      {/* Left: Result & Icon */}
                      <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                        trade.result === 'win' ? "bg-success/10 text-success" : 
                        trade.result === 'loss' ? "bg-error/10 text-error" : "bg-muted/10 text-muted"
                      )}>
                        {trade.result === 'win' ? <TrendingUp className="h-7 w-7" /> : <TrendingDown className="h-7 w-7" />}
                      </div>

                      {/* Middle: Symbol & Setup */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-xl font-bold text-white truncate">{trade.symbol}</h3>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            trade.result === 'win' ? "bg-success/20 text-success" : 
                            trade.result === 'loss' ? "bg-error/20 text-error" : "bg-muted/20 text-muted"
                          )}>
                            {trade.result}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <History className="h-3.5 w-3.5 mr-1.5" />
                            {trade.setup_type || 'No Setup Tag'}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {formatDate(trade.trade_date)}
                          </span>
                        </div>
                      </div>

                      {/* Right: Emotions & Mistakes */}
                      <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {trade.emotions?.slice(0, 2).map((emotion: string) => (
                            <span key={emotion} className="flex items-center px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-muted-foreground">
                              <Smile className="h-3 w-3 mr-1 text-yellow-400" />
                              {emotion}
                            </span>
                          ))}
                          {trade.mistakes?.slice(0, 1).map((mistake: string) => (
                            <span key={mistake} className="flex items-center px-2 py-1 rounded-lg bg-error/10 border border-error/10 text-[10px] text-error">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {mistake}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                          <span className="text-xs font-semibold mr-1">View Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl border-dashed border-white/10">
              <History className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No entries found</h3>
              <p className="text-muted-foreground max-w-xs mb-8">
                You haven't logged any trades yet. Start your journaling journey today!
              </p>
              <Button asChild variant="gradient" className="rounded-xl h-11 px-8">
                <Link to="/journal/new">Log Your First Trade</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Journal
