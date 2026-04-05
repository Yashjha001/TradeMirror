import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { LayoutDashboard } from 'lucide-react'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0B1220]">
              <span className="text-xl font-bold text-white italic">TM</span>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">TradeMirror</span>
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild variant="gradient" size="sm" className="shadow-lg glow-primary">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
