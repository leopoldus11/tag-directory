import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

/**
 * Client-side Supabase client
 * Uses the anon/public key - safe to use in client components
 * Automatically handles authentication and RLS policies
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Server-side Supabase client (admin)
 * Uses the service role key - ONLY use in API routes or server components
 * Bypasses RLS policies - use with caution!
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types will be generated later using Supabase CLI
// For now, we'll use inferred types from queries
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar: string | null
          github_username: string | null
          credits: number
          rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar?: string | null
          github_username?: string | null
          credits?: number
          rank?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar?: string | null
          github_username?: string | null
          credits?: number
          rank?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'
        }
      }
      tags: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          author_id: string | null
          platform: string
          tag_type: string | null
          content: Record<string, unknown>
          status: 'pending' | 'approved' | 'rejected'
          community_verified: boolean
          upvotes_count: number
          views_count: number
          file_path: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          author_id?: string | null
          platform: string
          tag_type?: string | null
          content: Record<string, unknown>
          status?: 'pending' | 'approved' | 'rejected'
          community_verified?: boolean
          upvotes_count?: number
          views_count?: number
          file_path?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          author_id?: string | null
          platform?: string
          tag_type?: string | null
          content?: Record<string, unknown>
          status?: 'pending' | 'approved' | 'rejected'
          community_verified?: boolean
          upvotes_count?: number
          views_count?: number
          file_path?: string | null
        }
      }
      // Add other tables as needed
    }
  }
}

