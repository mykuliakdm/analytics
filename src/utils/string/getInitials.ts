export const getInitials = (name: string) => {
  if (!name) return '?'

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return initials.length > 1 ? `${initials[0]}${initials.slice(-1)}` : initials
}
