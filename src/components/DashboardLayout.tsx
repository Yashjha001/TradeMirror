import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  PlusCircle, 
  Sparkles,
  Menu,
  X,
  User
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon, label, href, active, onClick }: SidebarItemProps) => (
  <Link to={href} onClick={onClick}>
    <div className={cn(
      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-primary/10 text-primary border border-primary/20" 
        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
    )}>
      <div className={cn(
        "transition-transform duration-200 group-hover:scale-110",
        active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
      {label === 'Insights' && (
        <Sparkles className="h-3.5 w-3.5 text-accent ml-auto animate-pulse" />
      )}
    </div>
  </Link>
)

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile, signOut } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview', href: '/dashboard' },
    { icon: <BookOpen className="h-5 w-5" />, label: 'Journal', href: '/journal' },
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Analytics', href: '/analytics' },
    { icon: <Sparkles className="h-5 w-5" />, label: 'Insights', href: '/insights' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-[#0B1220] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-[#0B1220] sticky top-0 h-screen p-6">
        <div className="flex items-center space-x-2 mb-10 px-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0B1220]">
              <span className="text-sm font-bold text-white italic">TM</span>
            </div>
          </div>
          <span className="text-xl font-bold text-white">TradeMirror</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.href}
              {...item}
              active={location.pathname === item.href}
            />
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <Button asChild variant="gradient" className="w-full justify-start rounded-xl h-12 shadow-lg glow-primary">
            <Link to="/journal/new">
              <PlusCircle className="mr-2 h-5 w-5" />
              New Entry
            </Link>
          </Button>
          
          <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile?.full_name || 'Trader'}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">{profile?.subscription_status || 'Free'} Plan</p>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-error transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-background/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-accent" />
          <span className="font-bold text-white">TradeMirror</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-background pt-20 px-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <SidebarItem 
                key={item.href}
                {...item}
                active={location.pathname === item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
            <div className="pt-4">
              <Button asChild variant="gradient" className="w-full h-12 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/journal/new">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  New Entry
                </Link>
              </Button>
            </div>
            <Button variant="ghost" className="w-full justify-start text-error hover:text-error hover:bg-error/10" onClick={handleSignOut}>
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
