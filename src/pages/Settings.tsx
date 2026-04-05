import { DashboardLayout } from '../components/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useAuthStore } from '../store/useAuthStore'
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  ChevronRight, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../components/ui/use-toast'
import { cn } from '../lib/utils'

const Settings = () => {
  const { profile, user } = useAuthStore()
  const { toast } = useToast()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Update logic would go here
    toast({ title: 'Profile Updated', description: 'Your changes have been saved.' })
    setIsLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile, subscription, and preferences.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Settings Nav */}
          <aside className="md:col-span-1 space-y-2">
            <SettingsNavItem icon={<User className="h-4 w-4" />} label="Profile" active />
            <SettingsNavItem icon={<CreditCard className="h-4 w-4" />} label="Billing" />
            <SettingsNavItem icon={<Shield className="h-4 w-4" />} label="Security" />
            <SettingsNavItem icon={<Bell className="h-4 w-4" />} label="Notifications" />
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Profile Section */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                <CardDescription>Update your public profile and email address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <Input 
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                      <Input 
                        value={user?.email || ''}
                        disabled
                        className="bg-white/5 border-white/10 rounded-xl opacity-50"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="outline" className="rounded-xl px-8 border-white/10 hover:bg-white/5" disabled={isLoading}>
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card className="glass-card border-primary/20 bg-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CreditCard className="h-24 w-24 text-primary" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Subscription Plan</CardTitle>
                    <CardDescription className="text-primary/70">You are currently on the {profile?.subscription_status || 'Free'} plan.</CardDescription>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                    Current
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <h4 className="text-lg font-bold">Free Plan</h4>
                    <ul className="space-y-2">
                      <PlanFeature label="Up to 20 trade entries" active />
                      <PlanFeature label="Basic analytics" active />
                      <PlanFeature label="Community support" active />
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl bg-primary text-primary-foreground space-y-4 shadow-xl shadow-primary/20 scale-105">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold">Pro Plan</h4>
                      <span className="text-2xl font-black">$19/mo</span>
                    </div>
                    <ul className="space-y-2">
                      <PlanFeature label="Unlimited entries" active light />
                      <PlanFeature label="Advanced AI Insights" active light />
                      <PlanFeature label="Priority support" active light />
                      <PlanFeature label="Custom trade tags" active light />
                    </ul>
                    <Button variant="default" className="w-full bg-white text-primary hover:bg-white/90 rounded-xl font-bold">
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 border-t border-white/5 px-6 py-4 flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Next billing date: Apr 24, 2026</p>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-transparent p-0">
                  Manage billing <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const SettingsNavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={cn(
    "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
    active ? "bg-white/10 text-white font-bold border border-white/10 shadow-lg" : "text-muted-foreground hover:bg-white/5 hover:text-white"
  )}>
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <ChevronRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", active ? "opacity-100" : "opacity-0")} />
  </button>
)

const PlanFeature = ({ label, active, light }: { label: string, active?: boolean, light?: boolean }) => (
  <li className={cn("flex items-center text-xs", light ? "text-primary-foreground" : "text-muted-foreground")}>
    <CheckCircle2 className={cn("h-3.5 w-3.5 mr-2", active ? (light ? "text-primary-foreground" : "text-success") : "text-muted opacity-50")} />
    {label}
  </li>
)

export default Settings
