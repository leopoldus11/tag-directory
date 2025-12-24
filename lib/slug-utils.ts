/**
 * Utility functions for generating and working with slugs
 */

/**
 * Generate a readable slug from a title
 * Format: "title-part-12345" (title + random 5-digit number)
 */
export function generateSlug(title: string): string {
  // Convert to lowercase and replace spaces/special chars with hyphens
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens

  // Generate a 5-digit random number
  const randomNum = Math.floor(10000 + Math.random() * 90000)

  // Combine: "title-part-12345"
  return `${baseSlug}-${randomNum}`
}

/**
 * Generate a slug from title, ensuring uniqueness
 * If slug exists, append incrementing number
 */
export function generateUniqueSlug(
  title: string,
  existingSlugs: string[],
  baseSlug?: string
): string {
  const slug = baseSlug || generateSlug(title)
  
  if (!existingSlugs.includes(slug)) {
    return slug
  }

  // If exists, try with incrementing number
  let counter = 1
  let newSlug = `${slug}-${counter}`
  
  while (existingSlugs.includes(newSlug)) {
    counter++
    newSlug = `${slug}-${counter}`
  }

  return newSlug
}

