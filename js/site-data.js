/**
 * Central site content — single source of truth for profile & contact info.
 */
export const SITE = {
  name: 'Sami-Severi Sjöberg',
  shortName: 'Sami-Severi',
  title: 'Full Stack Engineer & ICT Engineering Student',
  location: 'Turku, Finland',
  email: 'samiseveri.sjoberg@gmail.com',
  emailHref: 'mailto:samiseveri.sjoberg@gmail.com',
  phone: '+358 44 010 1160',
  phoneHref: 'tel:+358440101160',
  linkedin: 'https://www.linkedin.com/in/sami-severi-sjöberg-179a92273',
  linkedinLabel: 'Sami-Severi Sjöberg',
  github: 'https://github.com/samiseveri',
  githubLabel: '@samiseveri',
  instagram: 'https://www.instagram.com/sami_severi_sjoberg/',
  instagramLabel: '@sami_severi_sjoberg',
  profileImage: 'assets/images/profile.jpg',
  cvPath: 'assets/documents/CV_Sami-Severi Sjöberg (EN).pdf',
  cvDownloadName: 'CV_Sami-Severi Sjöberg (EN).pdf',
  /** Public site origin after deploy (no trailing slash). Leave empty until confirmed. */
  siteUrl: '',
  repositoryUrl: 'https://github.com/samiseveri/Sami-Severi-Sj-berg-Portfolio',
  tagline:
    'ICT Engineering student specializing in software engineering and project management — building full-stack products with craft and purpose.',
  about:
    'I am an ICT Engineering student at Turku University of Applied Sciences, specializing in software engineering and project management. I have nearly seven years of experience in the field through studies, projects, and hands-on work across software development, hardware, and game production. I have participated in hackathons, game jams, educational application development, and server setup — developing strong skills in full-stack development, SQL, WordPress, and project coordination, as well as design tools such as Figma.',
}

export const TYPING_PHRASES = [
  'Full Stack Engineer',
  'ICT Engineering Student',
  'Software Developer',
  'Project Manager',
]

/** Encode a relative asset path for use in href/src attributes. */
export function encodeAssetPath(path) {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}
