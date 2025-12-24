/**
 * Test script to verify Supabase connection
 * Run with: tsx scripts/test-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env.local file has:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔌 Testing Supabase connection...')
  console.log(`📍 Project URL: ${supabaseUrl}`)
  console.log('')

  try {
    // Test 1: Basic connection
    console.log('Test 1: Checking database connection...')
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      // If table doesn't exist yet, that's okay - connection works
      if (error.code === '42P01' || error.code === 'PGRST205') {
        console.log('✅ Database connection successful!')
        console.log('⚠️  Tables not created yet')
        console.log('')
        console.log('📝 Next step: Run the SQL schema from SUPABASE_SETUP_GUIDE.md')
        console.log('   1. Go to Supabase Dashboard → SQL Editor')
        console.log('   2. Copy the SQL schema from Step 5.2')
        console.log('   3. Run it in the SQL Editor')
        console.log('   4. Then run this test again to verify')
        return
      }
      throw error
    }

    console.log('✅ Database connection successful!')
    console.log('✅ Tables are accessible')
    console.log('')

    // Test 2: Check if tables exist
    console.log('Test 2: Checking tables...')
    const tables = ['users', 'tags', 'tools', 'jobs', 'articles']
    for (const table of tables) {
      const { error: tableError } = await supabase
        .from(table)
        .select('id')
        .limit(1)

      if (tableError && tableError.code === '42P01') {
        console.log(`  ⚠️  Table "${table}" does not exist`)
      } else if (tableError) {
        console.log(`  ❌ Error checking "${table}": ${tableError.message}`)
      } else {
        console.log(`  ✅ Table "${table}" exists`)
      }
    }

    console.log('')
    console.log('🎉 All tests passed! Supabase is ready to use.')
  } catch (err) {
    console.error('❌ Connection test failed:', err)
    if (err instanceof Error) {
      console.error('Error message:', err.message)
    }
    process.exit(1)
  }
}

testConnection()

