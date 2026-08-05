/**
 * Shared hobby data — used by hobbies.html and hobby-details.html
 *
 * To add your own photo for a hobby, place the image in:
 *   assets/images/hobbies/
 * and set the matching `image` path below (jpg, png, or webp).
 */
export const HOBBIES = [
  {
    id: 'gaming',
    title: 'Gaming',
    icon: '🎮',
    image: 'assets/images/hobbies/gaming.jpg',
    summary: 'Game jams, indie titles, and game production — from design to playtesting.',
    overview:
      'Gaming has been both a passion and a creative outlet for me. From playing indie titles to shipping projects under game jam deadlines, games taught me production planning, teamwork, and how to turn ideas into playable experiences.',
    highlights: [
      'Participated in game jams and collaborative game production',
      'Worked as Game Production Lead and Lead Designer at Studisco',
      'Experience across design, playtesting, and shipping under pressure',
      'Interest in indie games and creative game development',
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware & Tech',
    icon: '🖥️',
    image: 'assets/images/hobbies/hardware.jpg',
    summary: 'PC building, Raspberry Pi projects, and exploring new technologies.',
    overview:
      'My interest in technology started with hardware. Assembling PCs, updating BIOS firmware at Jimm\'s PC-Store, and later working with Raspberry Pi devices gave me a hands-on understanding of how systems work from the inside out.',
    highlights: [
      'Assembled and maintained computers in a professional retail setting',
      'Hands-on experience with Raspberry Pi and embedded platforms',
      'Comfortable troubleshooting hardware and firmware issues',
      'Curiosity for new tools, devices, and technical setups',
    ],
  },
  {
    id: 'unity',
    title: '3D & Unity',
    icon: '🎨',
    image: 'assets/images/hobbies/unity.jpg',
    summary: 'Level design and 3D world building in Unity for games and projects.',
    overview:
      '3D design and Unity let me combine technical problem-solving with visual creativity. Building levels and interactive worlds has helped me think about space, player flow, and how software comes alive in an immersive environment.',
    highlights: [
      'Built 3D game levels in Unity for university projects',
      'Experience with level design and spatial gameplay flow',
      'Interest in interactive environments and game worlds',
      'Bridge between visual design and technical implementation',
    ],
  },
  {
    id: 'sound',
    title: 'Sound & Music',
    icon: '🎵',
    image: 'assets/images/hobbies/sound.jpg',
    summary: 'Sound mixing for events and exploring audio production.',
    overview:
      'Sound and music are another creative side of my life. Mixing audio for school events and celebrations taught me timing, attention to detail, and how atmosphere shapes an experience — skills that also carry into product and game work.',
    highlights: [
      'School sound mixer for events and celebrations',
      'Interest in audio production and live sound',
      'Experience creating atmosphere through sound',
      'Appreciation for how audio supports storytelling and events',
    ],
  },
  {
    id: 'learning',
    title: 'Learning',
    icon: '📚',
    image: 'assets/images/hobbies/learning.jpg',
    summary: 'Always picking up something new — frameworks, languages, and tools.',
    overview:
      'Continuous learning is a core part of how I work. Whether it is a new framework, language, or production tool, I enjoy expanding my skill set and applying what I learn to real projects, courses, and team collaborations.',
    highlights: [
      'Active learner across software engineering and project management',
      'Regularly explores new frameworks, languages, and tools',
      'Applies learning through studies, projects, and hands-on practice',
      'Motivated by solving new technical challenges',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Innovation',
    icon: '🤖',
    image: 'assets/images/hobbies/ai.jpg',
    summary: 'Experimenting with AI tools and following emerging tech trends.',
    overview:
      'I follow emerging technologies closely and experiment with AI tools as part of my workflow. Innovation keeps me curious — I enjoy testing new approaches that can improve development speed, creativity, and product quality.',
    highlights: [
      'Experiments with modern AI tools in development workflows',
      'Follows trends in software, hardware, and digital products',
      'Interested in practical applications of emerging technology',
      'Uses experimentation as a way to learn and improve craft',
    ],
  },
  {
    id: 'cooking',
    title: 'Cooking',
    icon: '🍳',
    image: 'assets/images/hobbies/cooking.jpg',
    summary: 'Ship catering experience and a passion for food preparation.',
    overview:
      'Cooking became a serious skill during my naval service and later work aboard a Viking Line vessel. Earning my Ship\'s Cook certification and being recognized as Best Ship\'s Cook of the 2/22 intake reflect the discipline, teamwork, and care I bring to everything I do.',
    highlights: [
      'Served as a ship\'s cook in the Finnish Navy',
      'Earned Ship\'s Cook certification during military service',
      'Worked as a ship\'s cook aboard a Viking Line vessel',
      'Recognized as Best Ship\'s Cook of the 2/22 intake',
    ],
  },
  {
    id: 'nature',
    title: 'Nature',
    icon: '🌲',
    image: 'assets/images/hobbies/nature.jpg',
    summary: 'Exploring the Finnish outdoors and disconnecting from screens.',
    overview:
      'Spending time outdoors helps me reset and think more clearly. Exploring nature in Finland is a simple way to disconnect from screens, stay balanced, and come back to creative and technical work with a fresher perspective.',
    highlights: [
      'Enjoys exploring the Finnish outdoors',
      'Values time away from screens and digital noise',
      'Uses nature as a way to recharge and reflect',
      'Balances technical work with outdoor downtime',
    ],
  },
  {
    id: 'traveling',
    title: 'Traveling',
    icon: '🌍',
    image: 'assets/images/hobbies/traveling.jpg',
    summary: 'Hackathons abroad — including Kaunas, Lithuania — and new experiences.',
    overview:
      'Traveling connects me with new people, cultures, and collaborative challenges. Taking part in a hackathon in Kaunas, Lithuania was a memorable example of learning and building together outside my usual environment.',
    highlights: [
      'Participated in a hackathon in Kaunas, Lithuania',
      'Enjoys international collaboration and new environments',
      'Open to experiences that broaden perspective',
      'Combines travel with learning and creative challenges',
    ],
  },
]

export function getHobbyById(id) {
  return HOBBIES.find((h) => h.id === id) || null
}
