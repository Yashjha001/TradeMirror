import { DashboardLayout } from '../components/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { 
  Sparkles, 
  BrainCircuit, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Target,
  ArrowRight,
  Lightbulb,
  CheckCircle2
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'

const Insights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">AI Trading Insights</h1>
            <p className="text-muted-foreground">Deep analysis of your behavior, patterns, and psychology.</p>
          </div>
          <Button variant="gradient" className="rounded-xl px-6 h-11 glow-primary">
            <Sparkles className="h-5 w-5 mr-2" />
            Generate New Report
          </Button>
        </header>

        {/* Hero Insight Card */}
        <Card className="glass-card border-primary/20 bg-primary/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
            <BrainCircuit className="h-48 w-48 text-primary" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Executive Summary</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 max-w-2xl leading-tight">
              You are most profitable when trading <span className="text-primary">Crypto Breakouts</span> on the <span className="text-accent">15m Timeframe</span>.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8 leading-relaxed">
              Based on your last 50 trades, our AI has identified that your discipline score 
              is highest during the New York session. However, your performance drops 
              significantly when you engage in "Revenge Trading" after a loss.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">NY Session Win Rate: 72%</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-error/10 border border-error/20 flex items-center">
                <AlertTriangle className="h-4 w-4 text-error mr-2" />
                <span className="text-sm font-medium">Revenge Trade RR: 0.4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pattern Detection */}
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Zap className="h-6 w-6 mr-2 text-yellow-400" /> Pattern Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <InsightItem 
                type="positive"
                title="Patience Pays Off"
                description="When you wait at least 3 candles after a breakout before entry, your success rate increases by 24%."
              />
              <InsightItem 
                type="negative"
                title="Early Morning Slump"
                description="Trades taken before 6:00 AM local time result in a loss 68% of the time, regardless of the setup."
              />
              <InsightItem 
                type="neutral"
                title="Symbol Affinity"
                description="You perform significantly better on BTC/USDT than any other asset in your journal."
              />
            </CardContent>
          </Card>

          {/* Psychological Profile */}
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <BrainCircuit className="h-6 w-6 mr-2 text-accent" /> Psychological Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Discipline Matrix</h4>
                  <span className="text-xs font-bold text-accent">TOP 5% OF USERS</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1 text-center">
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Plan Adherence</p>
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-3xl font-bold">14%</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">FOMO Frequency</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Your journals show a high level of self-awareness. You accurately predict 
                the outcome of your trades in your pre-trade reflections 74% of the time."
              </p>
              <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5">
                Full Psychology Breakdown
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Suggestions */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-primary" /> Recommended Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard 
              title="Filter Low Timeframes"
              description="Stop trading the 1m and 5m timeframes for the next 10 trades. Focus on 1h+ to improve win rate."
              tag="STRATEGY"
            />
            <ActionCard 
              title="Post-Loss Cooldown"
              description="Implement a mandatory 2-hour break after any losing trade to prevent revenge trading behavior."
              tag="PSYCHOLOGY"
            />
            <ActionCard 
              title="Trailing Stop Trial"
              description="Our data shows you leave 15% of profit on the table. Try a 1.5 ATR trailing stop for 1 week."
              tag="EXECUTION"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

const InsightItem = ({ type, title, description }: { type: 'positive' | 'negative' | 'neutral', title: string, description: string }) => (
  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
    <div className={cn(
      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
      type === 'positive' ? "bg-success/10 text-success" : 
      type === 'negative' ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
    )}>
      {type === 'positive' ? <TrendingUp className="h-5 w-5" /> : 
       type === 'negative' ? <TrendingDown className="h-5 w-5" /> : <Target className="h-5 w-5" />}
    </div>
    <div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
)

const ActionCard = ({ title, description, tag }: { title: string, description: string, tag: string }) => (
  <Card className="glass-card border-white/5 hover:border-primary/30 transition-all p-6 group">
    <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20 mb-4 inline-block">
      {tag}
    </span>
    <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
    <Button variant="ghost" size="sm" className="p-0 text-primary hover:bg-transparent group-hover:translate-x-1 transition-transform">
      Learn more <ArrowRight className="ml-1 h-4 w-4" />
    </Button>
  </Card>
)

export default Insights
