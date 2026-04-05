import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  History, 
  Lock, 
  Sparkles, 
  Zap 
} from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0B1220]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-accent/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Trading Journal</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Reflect, Review, <br />
            <span className="gradient-text">Trade Better.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            TradeMirror uses advanced AI to analyze your trading psychology, 
            detect patterns in your mistakes, and help you build discipline 
            with a personalized journaling experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" variant="gradient" className="h-14 px-8 text-lg rounded-xl">
              <Link to="/register">
                Start Your Journal Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-white/10 bg-white/5 backdrop-blur-sm">
              <Link to="/login">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-background/50 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Your Trading Psychology</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to track your performance and grow as a trader.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BrainCircuit className="h-6 w-6 text-primary" />}
              title="AI Analysis"
              description="Get instant insights on your trades. Our AI detects repeated emotional patterns and suggests improvements."
            />
            <FeatureCard 
              icon={<History className="h-6 w-6 text-secondary" />}
              title="Trade Journaling"
              description="Seamlessly log every trade with screenshots, reflections, and emotional tags. Keep your records organized."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6 text-accent" />}
              title="Behavioral Analytics"
              description="Visualize your win rates, profit factors, and emotional consistency over time with interactive charts."
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-yellow-400" />}
              title="Mistake Detection"
              description="Automatically categorize and track your trading errors. Identify which setups are costing you money."
            />
            <FeatureCard 
              icon={<Lock className="h-6 w-6 text-green-400" />}
              title="Privacy First"
              description="Your trade data is private. No social feeds, no leaderboards—just you and your path to growth."
            />
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="Reflection Engine"
              description="Structured pre-trade and post-trade reflections to build mental clarity and discipline."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-white/10 p-12 overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to mirror your trading success?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of traders who are already using TradeMirror to build 
                the discipline needed for long-term profitability.
              </p>
              <Button asChild size="lg" variant="gradient" className="rounded-xl px-10">
                <Link to="/register">Create Your Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl font-bold">TradeMirror</span>
          </div>
          <div className="flex items-center space-x-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © 2026 TradeMirror. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all group">
    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
)

export default Landing
