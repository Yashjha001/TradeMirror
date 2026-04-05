export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          trading_experience: string | null
          preferred_markets: string[] | null
          subscription_status: string | null
          stripe_customer_id: string | null
          razorpay_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          trading_experience?: string | null
          preferred_markets?: string[] | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          razorpay_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          trading_experience?: string | null
          preferred_markets?: string[] | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          razorpay_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trade_entries: {
        Row: {
          id: string
          user_id: string
          symbol: string
          instrument_type: string | null
          entry_price: number
          exit_price: number | null
          timeframe: string | null
          setup_type: string | null
          risk_reward_ratio: number | null
          result: 'win' | 'loss' | 'breakeven' | null
          pnl: number | null
          screenshot_urls: string[] | null
          pre_trade_reflection: string | null
          post_trade_reflection: string | null
          emotions: string[] | null
          mistakes: string[] | null
          lessons: string[] | null
          strategy_notes: string | null
          trade_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          instrument_type?: string | null
          entry_price: number
          exit_price?: number | null
          timeframe?: string | null
          setup_type?: string | null
          risk_reward_ratio?: number | null
          result?: 'win' | 'loss' | 'breakeven' | null
          pnl?: number | null
          screenshot_urls?: string[] | null
          pre_trade_reflection?: string | null
          post_trade_reflection?: string | null
          emotions?: string[] | null
          mistakes?: string[] | null
          lessons?: string[] | null
          strategy_notes?: string | null
          trade_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          instrument_type?: string | null
          entry_price?: number
          exit_price?: number | null
          timeframe?: string | null
          setup_type?: string | null
          risk_reward_ratio?: number | null
          result?: 'win' | 'loss' | 'breakeven' | null
          pnl?: number | null
          screenshot_urls?: string[] | null
          pre_trade_reflection?: string | null
          post_trade_reflection?: string | null
          emotions?: string[] | null
          mistakes?: string[] | null
          lessons?: string[] | null
          strategy_notes?: string | null
          trade_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      ai_insights: {
        Row: {
          id: string
          trade_id: string | null
          user_id: string | null
          summary: string | null
          mistake_analysis: string | null
          emotional_analysis: string | null
          lessons_learned: string | null
          improvement_suggestions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          trade_id?: string | null
          user_id?: string | null
          summary?: string | null
          mistake_analysis?: string | null
          emotional_analysis?: string | null
          lessons_learned?: string | null
          improvement_suggestions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          trade_id?: string | null
          user_id?: string | null
          summary?: string | null
          mistake_analysis?: string | null
          emotional_analysis?: string | null
          lessons_learned?: string | null
          improvement_suggestions?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          amount: number
          currency: string
          status: string
          provider: string
          provider_payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          currency: string
          status: string
          provider: string
          provider_payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          currency?: string
          status?: string
          provider?: string
          provider_payment_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
