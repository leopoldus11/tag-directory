/**
 * Script to update tag slugs to be more readable
 * Format: "title-part-12345" (title + random 5-digit number)
 * Run with: npx tsx scripts/fix-tag-slugs.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { generateSlug } from '../lib/slug-utils'

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

async function fixSlugs() {
  console.log('🔧 Fixing tag slugs to be more readable...')
  console.log('')

  // Get all tags
  const { data: tags, error: fetchError } = await supabase
    .from('tags')
    .select('id, slug, title')

  if (fetchError) {
    console.error('❌ Error fetching tags:', fetchError)
    process.exit(1)
  }

  if (!tags || tags.length === 0) {
    console.log('⚠️  No tags found')
    return
  }

  console.log(`📦 Found ${tags.length} tags`)
  console.log('')

  let updatedCount = 0
  let skippedCount = 0

  for (const tag of tags) {
    // Check if slug already ends with a 5-digit number (our format)
    const hasNumberSuffix = /\d{5}$/.test(tag.slug)
    
    if (hasNumberSuffix) {
      // Already has the format we want (title-12345)
      console.log(`⏭️  Skipping "${tag.title}" - already has numbered slug: ${tag.slug}`)
      skippedCount++
      continue
    }

    // Generate new slug from title
    const newSlug = generateSlug(tag.title)

    // Check if new slug already exists
    const { data: existing } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', newSlug)
      .neq('id', tag.id)
      .single()

    if (existing) {
      // If exists, append a number
      let counter = 1
      let finalSlug = `${newSlug}-${counter}`
      
      while (true) {
        const { data: check } = await supabase
          .from('tags')
          .select('id')
          .eq('slug', finalSlug)
          .neq('id', tag.id)
          .single()

        if (!check) break
        counter++
        finalSlug = `${newSlug}-${counter}`
      }

      // Update tag
      const { error: updateError } = await supabase
        .from('tags')
        .update({ slug: finalSlug })
        .eq('id', tag.id)

      if (updateError) {
        console.error(`❌ Error updating "${tag.title}":`, updateError.message)
        continue
      }

      console.log(`✅ Updated "${tag.title}"`)
      console.log(`   Old: ${tag.slug}`)
      console.log(`   New: ${finalSlug}`)
      updatedCount++
    } else {
      // Update tag
      const { error: updateError } = await supabase
        .from('tags')
        .update({ slug: newSlug })
        .eq('id', tag.id)

      if (updateError) {
        console.error(`❌ Error updating "${tag.title}":`, updateError.message)
        continue
      }

      console.log(`✅ Updated "${tag.title}"`)
      console.log(`   Old: ${tag.slug}`)
      console.log(`   New: ${newSlug}`)
      updatedCount++
    }
  }

  console.log('')
  console.log('📊 Summary:')
  console.log(`   ✅ Updated: ${updatedCount}`)
  console.log(`   ⏭️  Skipped: ${skippedCount}`)
  console.log('')
  console.log('🎉 Slug update completed!')
}

fixSlugs().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})

