/**
 * Tags/Blueprints data access layer using Supabase
 * This replaces the file-based system in lib/blueprints.ts
 */

import { supabase, supabaseAdmin } from './supabase'
import { TrackingBlueprint } from './schemas/blueprint'

/**
 * Get all tags from Supabase
 * @param options - Filtering options
 */
export async function getAllTags(options?: {
  platform?: string
  status?: 'pending' | 'approved' | 'rejected'
  limit?: number
  offset?: number
}): Promise<TrackingBlueprint[]> {
  let query = supabase
    .from('tags')
    .select('*')
    .order('created_at', { ascending: false })

  // Apply filters
  if (options?.platform) {
    query = query.eq('platform', options.platform)
  }

  if (options?.status) {
    query = query.eq('status', options.status)
  } else {
    // Default: only show approved tags
    query = query.eq('status', 'approved')
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  // Convert database rows to TrackingBlueprint format
  return (data || []).map((row) => {
    // The content field contains the full JSON, so we can reconstruct the blueprint
    const content = row.content as Record<string, unknown>
    return {
      id: row.slug, // Use slug as ID for URLs (more readable)
      slug: row.slug,
      title: row.title,
      description: row.description || undefined,
      author: content.author as string | string[],
      platform: row.platform,
      type: (content.type || row.tag_type || 'Tag') as 'Tag' | 'Rule' | 'Snippet',
      tagType: row.tag_type || undefined,
      content: typeof content.content === 'string' ? content.content : JSON.stringify(content),
      community_verified: row.community_verified,
      difficulty: content.difficulty as string | undefined,
      tags: content.tags as string[] | undefined,
      triggers: content.triggers as TrackingBlueprint['triggers'],
      conditions: content.conditions as TrackingBlueprint['conditions'],
      exceptions: content.exceptions as TrackingBlueprint['exceptions'],
      executionOrder: content.executionOrder as number | undefined,
      useCase: content.useCase as string | undefined,
      vendor: content.vendor as string | undefined,
      vendorIcon: content.vendorIcon as string | undefined,
      filePath: row.file_path || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    } as TrackingBlueprint
  })
}

/**
 * Get a single tag by slug
 */
export async function getTagBySlug(slug: string): Promise<TrackingBlueprint | null> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved') // Only return approved tags
    .single()

  if (error || !data) {
    return null
  }

  // Convert to TrackingBlueprint format
  const content = data.content as Record<string, unknown>
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description || undefined,
    author: content.author as string | string[],
    platform: data.platform,
    type: (content.type || data.tag_type || 'Tag') as 'Tag' | 'Rule' | 'Snippet',
    tagType: data.tag_type || undefined,
    content: typeof content.content === 'string' ? content.content : JSON.stringify(content),
    community_verified: data.community_verified,
    difficulty: content.difficulty as string | undefined,
    tags: content.tags as string[] | undefined,
    triggers: content.triggers as TrackingBlueprint['triggers'],
    conditions: content.conditions as TrackingBlueprint['conditions'],
    exceptions: content.exceptions as TrackingBlueprint['exceptions'],
    executionOrder: content.executionOrder as number | undefined,
    useCase: content.useCase as string | undefined,
    vendor: content.vendor as string | undefined,
    vendorIcon: content.vendorIcon as string | undefined,
    filePath: data.file_path || undefined,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as TrackingBlueprint
}

/**
 * Get tags by platform
 */
export async function getTagsByPlatform(platform: string): Promise<TrackingBlueprint[]> {
  return getAllTags({ platform })
}

/**
 * Create a new tag (requires authentication)
 */
export async function createTag(
  tagData: Omit<TrackingBlueprint, 'id' | 'createdAt' | 'updatedAt'>,
  authorId: string
): Promise<TrackingBlueprint | null> {
  // Prepare content JSON (store full blueprint as JSON)
  const contentJson: Record<string, unknown> = {
    ...tagData,
    author: tagData.author,
    type: tagData.type,
    content: tagData.content,
    difficulty: tagData.difficulty,
    tags: tagData.tags,
    triggers: tagData.triggers,
    conditions: tagData.conditions,
    exceptions: tagData.exceptions,
    executionOrder: tagData.executionOrder,
    useCase: tagData.useCase,
    vendor: tagData.vendor,
    vendorIcon: tagData.vendorIcon,
  }

  const { data, error } = await supabaseAdmin
    .from('tags')
    .insert({
      slug: tagData.slug,
      title: tagData.title,
      description: tagData.description || null,
      author_id: authorId,
      platform: tagData.platform,
      tag_type: tagData.tagType || null,
      content: contentJson,
      status: 'pending', // New tags need approval
      community_verified: false,
      upvotes_count: 0,
      views_count: 0,
      file_path: tagData.filePath || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating tag:', error)
    return null
  }

  // Return the created tag (convert back to TrackingBlueprint format)
  return getTagBySlug(data.slug)
}

/**
 * Update a tag (requires authentication and ownership)
 */
export async function updateTag(
  slug: string,
  updates: Partial<TrackingBlueprint>,
  userId: string
): Promise<TrackingBlueprint | null> {
  // Check ownership first
  const { data: existing } = await supabase
    .from('tags')
    .select('author_id')
    .eq('slug', slug)
    .single()

  if (!existing || existing.author_id !== userId) {
    throw new Error('Unauthorized: You can only update your own tags')
  }

  // Prepare updates
  const updateData: Record<string, unknown> = {}
  
  if (updates.title) updateData.title = updates.title
  if (updates.description !== undefined) updateData.description = updates.description
  if (updates.platform) updateData.platform = updates.platform
  if (updates.tagType) updateData.tag_type = updates.tagType

  // Update content JSON if any fields changed
  if (Object.keys(updates).length > 0) {
    const { data: current } = await supabase
      .from('tags')
      .select('content')
      .eq('slug', slug)
      .single()

    if (current) {
      const content = current.content as Record<string, unknown>
      updateData.content = {
        ...content,
        ...updates,
      }
    }
  }

  const { error } = await supabaseAdmin
    .from('tags')
    .update(updateData)
    .eq('slug', slug)

  if (error) {
    console.error('Error updating tag:', error)
    return null
  }

  return getTagBySlug(slug)
}

/**
 * Increment view count for a tag
 */
export async function incrementTagViews(slug: string): Promise<void> {
  try {
    // Try RPC function first (if it exists)
    const { error: rpcError } = await supabaseAdmin.rpc('increment_tag_views', { tag_slug: slug })
    
    if (rpcError) {
      // Fallback: manual increment if RPC doesn't exist
      const { data } = await supabaseAdmin
        .from('tags')
        .select('views_count')
        .eq('slug', slug)
        .single()

      if (data) {
        await supabaseAdmin
          .from('tags')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('slug', slug)
      }
    }
  } catch (err) {
    // Silently fail - view counting is not critical
    console.error('Error incrementing tag views:', err)
  }
}

