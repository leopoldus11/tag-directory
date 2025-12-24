/**
 * Quick script to check what slugs are in the database
 * Run with: npx tsx scripts/check-tag-slugs.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function checkSlugs() {
  const { data, error } = await supabase
    .from('tags')
    .select('id, slug, title')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Tags in database:')
  console.log('')
  data?.forEach((tag) => {
    console.log(`Title: ${tag.title}`)
    console.log(`  ID: ${tag.id}`)
    console.log(`  Slug: ${tag.slug}`)
    console.log(`  URL would be: /tags/${tag.slug}`)
    console.log('')
  })
}

checkSlugs()

