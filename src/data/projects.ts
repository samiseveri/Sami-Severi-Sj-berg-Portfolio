export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
}

export const projects: Project[] = [
  {
    title: 'Aurora Dashboard',
    description:
      'A real-time analytics dashboard with live charts, dark mode, and a plugin system for custom widgets.',
    tags: ['React', 'TypeScript', 'D3', 'WebSockets'],
    link: 'https://example.com/aurora',
  },
  {
    title: 'Trailhead',
    description:
      'A trip-planning app for hikers featuring offline maps, elevation profiles, and shared itineraries.',
    tags: ['React Native', 'MapLibre', 'SQLite'],
    link: 'https://example.com/trailhead',
  },
  {
    title: 'Cadence',
    description:
      'A minimalist habit tracker that turns daily routines into streaks with gentle, motivating nudges.',
    tags: ['Vite', 'PWA', 'IndexedDB'],
    link: 'https://example.com/cadence',
  },
]
