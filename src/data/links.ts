/**
 * Contact + social links.
 * Fill in the `href` for each entry and it automatically becomes a real link.
 * Leave it as an empty string and the tile renders as "link coming soon" (no broken links).
 *
 *  - github / linkedin / instagram / leetcode: full https:// URLs
 *  - email: a plain address (e.g. name@example.com). It becomes a mailto: link.
 */
export type LinkId = 'github' | 'linkedin' | 'instagram' | 'leetcode' | 'email'

export interface SocialLink {
  id: LinkId
  label: string
  /** Short hint shown on the tile */
  hint: string
  /** Real URL / address. Empty string = not provided yet. */
  href: string
}

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', hint: 'Code & experiments', href: 'https://github.com/Rakshitha-024' },
  { id: 'linkedin', label: 'LinkedIn', hint: 'Professional profile', href: 'https://www.linkedin.com/in/rakshitha-62b224329/' },
  { id: 'instagram', label: 'Instagram', hint: 'Behind the scenes', href: 'https://www.instagram.com/_rakshitha_024/' },
  { id: 'leetcode', label: 'LeetCode', hint: 'Problem-solving practice', href: 'https://leetcode.com/u/Rakshitha024/' },
  { id: 'email', label: 'Email', hint: 'Best way to reach me', href: 'mailto:rakshitha0924@gmail.com' },
]

export const resolveHref = (l: SocialLink): string =>
  !l.href ? '' : l.id === 'email' && !l.href.startsWith('mailto:') ? `mailto:${l.href}` : l.href
