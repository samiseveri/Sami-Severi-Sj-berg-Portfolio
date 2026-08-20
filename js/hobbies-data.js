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
    image: 'assets/images/hobbies/gamejam.jpeg',
    galleryManifest: 'assets/images/hobbies/gaming-gallery.json',
    summary: 'Game jams, indie titles, and game production — from design to playtesting.',
    overview:
      'Gaming has been both a passion and a creative outlet for me. From playing indie titles to shipping projects under game jam deadlines, games taught me production planning, teamwork, and how to turn ideas into playable experiences.',
    highlights: [
      'Participated in game jams and collaborative game production',
      'Worked as Game Production Lead and Lead Designer at Studisco',
      'Experience across design, playtesting, and shipping under pressure',
      'Interest in indie games and creative game development',
    ],
    links: [
      {
        type: 'steam',
        label: 'Steam Profile',
        href: 'https://steamcommunity.com/profiles/76561198155905414/',
      },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware & Tech',
    icon: '🖥️',
    image: 'assets/images/hobbies/Harvare.jpeg',
    summary: 'PC building, Raspberry Pi projects, homelabbing, and exploring new technologies.',
    overview:
      "My interest in technology started with hardware. Assembling PCs, updating BIOS firmware at Jimm's PC-Store, and later working with Raspberry Pi devices gave me a hands-on understanding of how systems work from the inside out. I also enjoy homelabbing — experimenting with servers, networking, and different technologies in my own home lab setup.",
    highlights: [
      'Assembled and maintained computers in a professional retail setting',
      'Hands-on experience with Raspberry Pi and embedded platforms',
      'Homelab enthusiast — experimenting with servers, networking, and new tech at home',
      'Comfortable troubleshooting hardware and firmware issues',
      'Curiosity for new tools, devices, and technical setups',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Innovation',
    icon: '🤖',
    image: 'assets/images/hobbies/ai.jpg',
    summary:
      'Prompt engineering, vibe coding, and AI-assisted development as part of my everyday workflow.',
    overview:
      'AI has become an integral part of how I develop software and solve problems. I have delved into prompt engineering and vibe coding — using AI as a hands-on development and productivity tool while staying in control of the architecture, logic, and technical decisions myself. From generating and improving code to debugging, reviewing, and researching unfamiliar technologies, AI helps me work faster and more deliberately. I also rely on it for grammar and writing assistance when refining documentation and communication, and for brainstorming ideas during early project stages. Beyond day-to-day use, I actively explore and experiment with new AI tools and technologies to stay ahead of what is possible.',
    highlights: [
      'Prompt engineering and vibe coding as part of everyday software development',
      'AI-assisted coding — generating, improving, debugging, and reviewing code',
      'Research and problem solving with AI to explore technologies and find solutions',
      'Grammar and writing assistance for documentation and professional communication',
      'Brainstorming and idea development during project planning',
      'Continuously exploring new AI tools, models, and workflows',
    ],
  },
  {
    id: 'cooking',
    title: 'Cooking',
    icon: '🍳',
    image: 'assets/images/hobbies/navy.jpg',
    galleryManifest: 'assets/images/hobbies/cooking-gallery.json',
    summary: 'Professional ship cook experience in the Finnish Navy and at Viking Line.',
    overview:
      'What started as an interest in food turned into real professional experience. During my service in the Finnish Navy, I worked as a ship cook — a role comparable to a line cook — preparing meals at scale aboard the Halli, where I also completed my professional cooking qualifications. That work earned me the Best Cook of the 2/22 intake award, which remains one of my proudest achievements. After finishing my military service, I continued as a ship cook at Viking Line during the summer of 2023, before beginning my studies at Turku University of Applied Sciences.',
    highlights: [
      'Worked as a professional ship cook (comparable to a line cook) in the Finnish Navy',
      'Completed professional cooking qualifications aboard the Halli',
      'Awarded Best Cook of the 2/22 intake',
      'Continued as a ship cook at Viking Line in the summer of 2023',
      'Transitioned from professional cooking to studies at TUAS',
    ],
  },
  {
    id: 'nature',
    title: 'Nature',
    icon: '🌲',
    image: 'assets/images/hobbies/nature1 (1).jpeg',
    galleryManifest: 'assets/images/hobbies/nature-gallery.json',
    imageFit: 'contain',
    summary: 'Exploring the Finnish outdoors, collecting plants, and staying close to the sea.',
    overview:
      'Spending time outdoors helps me reset and think more clearly. I have a strong love for the ocean and the sea, and I try to spend time near the water whenever possible. Being close to the sea is an important part of how I enjoy nature — I’ve been a sailor since I was younger, I always love being on the water, and I also stay active as a fisherman. One of my long-term dreams is to own a sailboat someday, and that feeling is what keeps me coming back to the coast. I\u2019m also a passionate plant collector \u2014 I currently have over 130 plants in my collection, and it\u2019s become a hobby that brings a bit of nature indoors as well.',
    highlights: [
      'Enjoys exploring the Finnish outdoors',
      'Values time away from screens and digital noise',
      'Strong love for the ocean and the sea',
      'Sailor since I was younger — always enjoyed being on the water',
      'Active fisherman — enjoying time near the water',
      'Dreaming of owning a sailboat someday',
      'Passionate plant collector with over 130 plants',
      'Uses nature as a way to recharge and reflect',
      'Balances technical work with outdoor downtime',
    ],
  },
  {
    id: 'traveling',
    title: 'Voluntary Work',
    icon: '🌍',
    image: 'assets/images/hobbies/amma-crowd.jpg',
    imageFit: 'contain',
    summary: 'Long-term involvement with the Amma organization — tours, events, and Ashram life.',
    overview:
      'Voluntary work has been a long-term part of my life, and I have been involved with the Amma organization throughout my life. I have spent one month living at the Mata Amritanandamayi (Amma) Ashram in Amritapuri, India, experiencing life in the monastery/community first-hand. I continue to be actively involved today, and I participate in their tours and events around the world, supporting the organization wherever I can. For me, this is a meaningful commitment that has stayed with me long after the first experience — it is something I return to and support in my everyday life. Learn more at amma.org.',
    cta: {
      label: 'Visit Amma Organization',
      href: 'https://amma.org/',
    },
    highlights: [
      'Involved with the Amma organization throughout my life',
      'Lived for one month at the Mata Amritanandamayi (Amma) Ashram in Amritapuri, India',
      'Continues to be actively involved with Amma today',
      'Participates in Amma tours and events around the world',
      'A long-term commitment that remains meaningful beyond one-time volunteering',
    ],
  },
  {
    id: 'fencing',
    title: 'Saber Fencing',
    icon: '🤺',
    image: 'assets/images/hobbies/miekkailu1 (1).jpeg',
    galleryManifest: 'assets/images/hobbies/fencing-gallery.json',
    imageFit: 'contain',
    summary: 'Active saber fencer since 2017 — discipline, speed, and competitive spirit.',
    overview:
      'I have been fencing since 2017 and am still very active in the sport. Saber fencing is a fast-paced discipline that demands quick reflexes, strategic thinking, and physical fitness — qualities that carry over into many other areas of life. Training and competing regularly keeps me sharp, disciplined, and motivated, and the fencing community has become an important part of my life outside of work and studies.',
    highlights: [
      'Active saber fencer since 2017',
      'Trains and competes regularly',
      'Values the discipline, speed, and strategy the sport demands',
      'Part of the fencing community',
    ],
  },
]

export function getHobbyById(id) {
  return HOBBIES.find((h) => h.id === id) || null
}
