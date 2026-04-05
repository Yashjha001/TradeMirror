import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../components/DashboardLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Upload, 
  Plus, 
  X,
  Target,
  Zap,
  Smile,
  AlertTriangle,
  BookOpen
} from 'lucide-react'
import { useToast } from '../components/ui/use-toast'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/useAuthStore'
import { cn } from '../lib/utils'

const NewEntry = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Form state
  const [formData, setFormData] = useState({
    symbol: '',
    instrument_type: 'Crypto',
    entry_price: '',
    exit_price: '',
    timeframe: '15m',
    setup_type: '',
    risk_reward_ratio: '',
    result: 'win',
    pre_trade_reflection: '',
    post_trade_reflection: '',
    strategy_notes: '',
  })

  const [emotions, setEmotions] = useState<string[]>([])
  const [mistakes, setMistakes] = useState<string[]>([])
  const [lessons, setLessons] = useState<string[]>([])
  const [newLesson, setNewLesson] = useState('')

  const emotionOptions = ['Confident', 'Anxious', 'Greedy', 'Disciplined', 'Fearful', 'Calm', 'Frustrated', 'Patient']
  const mistakeOptions = ['FOMO', 'Revenge Trade', 'Oversized', 'Early Exit', 'Late Entry', 'No Stop Loss', 'Hesitation']

  const toggleEmotion = (emotion: string) => {
    setEmotions(prev => 
      prev.includes(emotion) ? prev.filter(e => e !== emotion) : [...prev, emotion]
    )
  }

  const toggleMistake = (mistake: string) => {
    setMistakes(prev => 
      prev.includes(mistake) ? prev.filter(m => m !== mistake) : [...prev, mistake]
    )
  }

  const addLesson = () => {
    if (newLesson.trim()) {
      setLessons([...lessons, newLesson.trim()])
      setNewLesson('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // if (!user) return // Removed restriction for direct access USP
    
    setIsLoading(true)
    const { error } = await supabase.from('trade_entries').insert({
      user_id: user?.id || null, // Allow null for anonymous demo entries
      symbol: formData.symbol,
      instrument_type: formData.instrument_type,
      entry_price: parseFloat(formData.entry_price),
      exit_price: formData.exit_price ? parseFloat(formData.exit_price) : null,
      timeframe: formData.timeframe,
      setup_type: formData.setup_type,
      risk_reward_ratio: formData.risk_reward_ratio ? parseFloat(formData.risk_reward_ratio) : null,
      result: formData.result as any,
      pre_trade_reflection: formData.pre_trade_reflection,
      post_trade_reflection: formData.post_trade_reflection,
      strategy_notes: formData.strategy_notes,
      emotions,
      mistakes,
      lessons,
      trade_date: new Date().toISOString(),
    } as any)

    if (error) {
      toast({ variant: 'destructive', title: 'Error saving trade', description: error.message })
    } else {
      toast({ title: 'Trade logged successfully!', description: 'Your journal has been updated.' })
      navigate('/journal')
    }
    setIsLoading(false)
  }

  const handleAIAnalysis = async () => {
    if (!formData.pre_trade_reflection || !formData.post_trade_reflection) {
      toast({ 
        title: 'Need more data', 
        description: 'Please write your reflections before starting AI analysis.' 
      })
      return
    }

    setIsAnalyzing(true)
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: 'AI Analysis Complete',
      description: 'AI suggests you were slightly anxious during entry. Consider waiting for a clearer signal next time.',
    })
    
    // Add AI-detected emotion if not present
    if (!emotions.includes('Anxious')) {
      setEmotions([...emotions, 'Anxious'])
    }
    
    setIsAnalyzing(false)
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newPreviews = files.map(file => URL.createObjectURL(file))
      setPreviewUrls(prev => [...prev, ...newPreviews])
    }
  }

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">New Journal Entry</h1>
              <p className="text-muted-foreground text-sm">Capture your thoughts and data for future review.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleAIAnalysis} 
              disabled={isAnalyzing}
              className="border-accent/20 hover:bg-accent/5 text-accent rounded-xl"
            >
              {isAnalyzing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-accent mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              AI Analyze
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading} variant="gradient" className="rounded-xl px-6">
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Entry
            </Button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          {/* Main Form Data */}
          <div className="md:col-span-2 space-y-8">
            <Card className="glass-card border-white/5 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" /> Trade Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Symbol / Pair</label>
                  <Input 
                    placeholder="BTC/USDT" 
                    value={formData.symbol} 
                    onChange={e => setFormData({...formData, symbol: e.target.value})}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Setup Type</label>
                  <Input 
                    placeholder="Bullish Breakout" 
                    value={formData.setup_type} 
                    onChange={e => setFormData({...formData, setup_type: e.target.value})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Entry Price</label>
                  <Input 
                    type="number" 
                    step="any"
                    placeholder="0.00" 
                    value={formData.entry_price} 
                    onChange={e => setFormData({...formData, entry_price: e.target.value})}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Exit Price</label>
                  <Input 
                    type="number" 
                    step="any"
                    placeholder="0.00" 
                    value={formData.exit_price} 
                    onChange={e => setFormData({...formData, exit_price: e.target.value})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Result</label>
                  <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, result: 'win'})}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-sm font-bold transition-all",
                        formData.result === 'win' ? "bg-success text-white shadow-lg" : "text-muted-foreground hover:text-white"
                      )}
                    >Win</button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, result: 'loss'})}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-sm font-bold transition-all",
                        formData.result === 'loss' ? "bg-error text-white shadow-lg" : "text-muted-foreground hover:text-white"
                      )}
                    >Loss</button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, result: 'breakeven'})}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-sm font-bold transition-all",
                        formData.result === 'breakeven' ? "bg-muted text-white shadow-lg" : "text-muted-foreground hover:text-white"
                      )}
                    >B.E.</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Timeframe</label>
                  <select 
                    value={formData.timeframe} 
                    onChange={e => setFormData({...formData, timeframe: e.target.value})}
                    className="w-full h-10 px-3 rounded-md border border-white/10 bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="1m">1 Minute</option>
                    <option value="5m">5 Minutes</option>
                    <option value="15m">15 Minutes</option>
                    <option value="1h">1 Hour</option>
                    <option value="4h">4 Hours</option>
                    <option value="1d">Daily</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 shadow-xl">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-accent" /> Reflections & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Pre-Trade Reflection</label>
                  <textarea 
                    rows={4}
                    placeholder="What are you thinking before entering? Are you following your plan?"
                    value={formData.pre_trade_reflection}
                    onChange={e => setFormData({...formData, pre_trade_reflection: e.target.value})}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Post-Trade Reflection</label>
                  <textarea 
                    rows={4}
                    placeholder="How did you feel during the trade? Did you manage it well?"
                    value={formData.post_trade_reflection}
                    onChange={e => setFormData({...formData, post_trade_reflection: e.target.value})}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 shadow-xl">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-primary" /> Screenshots
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div 
                  onClick={handleFileClick}
                  className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white/5 group"
                >
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                  <p className="text-sm font-medium">Click to upload trade screenshots</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>

                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 p-1 bg-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Psychology & Mistakes */}
          <div className="space-y-8">
            <Card className="glass-card border-white/5 shadow-xl">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <Smile className="h-5 w-5 mr-2 text-yellow-400" /> Psychology
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {emotionOptions.map(emotion => (
                    <button
                      key={emotion}
                      type="button"
                      onClick={() => toggleEmotion(emotion)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        emotions.includes(emotion) 
                          ? "bg-primary text-primary-foreground shadow-lg" 
                          : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
                      )}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 shadow-xl">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-error" /> Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {mistakeOptions.map(mistake => (
                    <button
                      key={mistake}
                      type="button"
                      onClick={() => toggleMistake(mistake)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        mistakes.includes(mistake) 
                          ? "bg-error text-white shadow-lg" 
                          : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
                      )}
                    >
                      {mistake}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/5 shadow-xl">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-success" /> Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="New lesson..." 
                    value={newLesson}
                    onChange={e => setNewLesson(e.target.value)}
                    className="bg-white/5 border-white/10"
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addLesson())}
                  />
                  <Button type="button" size="icon" onClick={addLesson} className="bg-success hover:bg-success/90 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {lessons.map((lesson, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group">
                      <span className="text-xs text-white">{lesson}</span>
                      <button 
                        onClick={() => setLessons(lessons.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {lessons.length === 0 && (
                    <p className="text-xs text-center text-muted-foreground py-4">No lessons added yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default NewEntry
