/**
 * Migration script to move existing tags from files to Supabase database
 * Run with: npx tsx scripts/migrate-tags-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { getAllBlueprints } from '../lib/blueprints'
import { TrackingBlueprint } from '../lib/schemas/blueprint'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function migrateTags() {
  console.log('🚀 Starting migration of tags to Supabase...')
  console.log('')

  // Get all existing tags from files
  const blueprints = getAllBlueprints()
  console.log(`📦 Found ${blueprints.length} tags to migrate`)
  console.log('')

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0

  for (const blueprint of blueprints) {
    try {
      // Check if tag already exists (by slug)
      const { data: existing } = await supabase
        .from('tags')
        .select('id')
        .eq('slug', blueprint.slug)
        .single()

      if (existing) {
        console.log(`⏭️  Skipping "${blueprint.title}" - already exists`)
        skippedCount++
        continue
      }

      // Prepare tag data for database
      const tagData = {
        slug: blueprint.slug,
        title: blueprint.title,
        description: blueprint.description || null,
        author_id: null, // Will be set when we link to users
        platform: blueprint.platform,
        tag_type: blueprint.tagType || null,
        content: blueprint as unknown as Record<string, unknown>, // Store full JSON
        status: 'approved' as const, // Auto-approve existing tags
        community_verified: blueprint.community_verified || false,
        upvotes_count: 0,
        views_count: 0,
        file_path: blueprint.filePath || `src/content/tags/${blueprint.slug}.json`,
      }

      // Insert into database
      const { data, error } = await supabase
        .from('tags')
        .insert(tagData)
        .select()
        .single()

      if (error) {
        console.error(`❌ Error migrating "${blueprint.title}":`, error.message)
        errorCount++
        continue
      }

      console.log(`✅ Migrated "${blueprint.title}" (${blueprint.platform})`)
      successCount++
    } catch (err) {
      console.error(`❌ Error migrating "${blueprint.title}":`, err)
      errorCount++
    }
  }

  console.log('')
  console.log('📊 Migration Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ⏭️  Skipped: ${skippedCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log('')

  if (errorCount === 0) {
    console.log('🎉 Migration completed successfully!')
  } else {
    console.log('⚠️  Migration completed with some errors')
  }
}

migrateTags().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})

