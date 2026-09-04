export const SITE_URL = 'https://ajay-weds-henna.vercel.app'

export const COUPLE = {
  groom: 'Ajay Babu',
  bride: 'Henna Prathap',
  groomShort: 'Ajay',
  brideShort: 'Henna',
}

export const CEREMONY_DATE = new Date('2026-10-04T15:00:00+05:30')

export const OCCASIONS = [
  {
    id: 'matrimony',
    label: 'Sacrament of Matrimony',
    date: '04 · October · 2026',
    time: '3:00 PM',
    venue: 'Little Flower Syro-Malabar Church',
    location: 'Kurumassery',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Little+Flower+Syro-Malabar+Church+Kurumassery',
    noteLabel: 'Solemnized by',
    note: 'His Excellency Mar Antony Kariyil CMI',
    subtitle: 'Bishop Emeritus, Ernakulam–Angamaly',
  },
  {
    id: 'reception',
    label: 'Reception',
    date: '04 · October · 2026',
    time: '6:30 PM onwards',
    venue: 'Adlux International Convention Centre',
    location: 'Angamaly',
    mapsUrl: 'https://maps.app.goo.gl/o31Wgju5P2gMGYuu8',
    note: 'Dinner to Follow',
  },
]

export const STORY = {
  title: 'Two Journeys · One Story',
  bride: {
    name: 'Henna',
    role: 'The Bride',
    bio: 'Henna is a vibrant medical student with an adventurous heart and a creative soul. A talented singer and dancer, she finds joy in movies, fashion, and expressing her individuality with effortless charm. Kind, beautiful, and full of life, she brings warmth and spontaneity to every moment she touches.',
  },
  interlude: 'And then, life had a beautiful surprise waiting for her…',
  groom: {
    name: 'Ajay',
    role: 'The Groom',
    bio: 'Ajay is a handsome and charismatic entrepreneur, leading the way at SG Group with ambition, talent, and determination. A gentleman at heart, he is passionate about swimming, adventure, movies, and making the most of every experience life has to offer. Confident yet kind, driven yet easy-going, Ajay has a charm that is impossible to miss. He is Henna’s biggest fan.',
  },
  conclusion: 'Two different journeys. Two beautiful souls. And somehow, they found their way to each other—turning two separate stories into one they never want to end.',
  paragraphs: [
    'Henna is a vibrant medical student with an adventurous heart and a creative soul. A talented singer and dancer, she finds joy in movies, fashion, and expressing her individuality with effortless charm. Kind, beautiful, and full of life, she brings warmth and spontaneity to every moment she touches.',
    'And then, life had a beautiful surprise waiting for her…',
    'Ajay is a handsome and charismatic entrepreneur, leading the way at SG Group with ambition, talent, and determination. A gentleman at heart, he is passionate about swimming, adventure, movies, and making the most of every experience life has to offer. Confident yet kind, driven yet easy-going, Ajay has a charm that is impossible to miss. He is Henna’s biggest fan.',
    'Two different journeys. Two beautiful souls. And somehow, they found their way to each other—turning two separate stories into one they never want to end.',
  ],
}

export const FAMILY = {
  text: 'With warm regards',
  names: ['Babu George', 'Geena Babu', 'Ajay Babu', 'Anjitha Babu'],
}

const formatCalendarDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

export function generateICS() {
  const events = [
    {
      start: CEREMONY_DATE,
      end: new Date(CEREMONY_DATE.getTime() + 2 * 60 * 60 * 1000),
      title: 'Ajay & Henna - Sacrament of Matrimony',
      location: 'Little Flower Syro-Malabar Church, Kurumassery',
    },
    {
      start: new Date('2026-10-04T18:30:00+05:30'),
      end: new Date('2026-10-04T22:30:00+05:30'),
      title: 'Ajay & Henna - Wedding Reception',
      location: 'Adlux International Convention Centre, Angamaly',
    },
  ]

  const calendarEvents = events.flatMap((event) => [
    'BEGIN:VEVENT',
    `DTSTART:${formatCalendarDate(event.start)}`,
    `DTEND:${formatCalendarDate(event.end)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
  ])

  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AjayHenna//Wedding//EN', ...calendarEvents, 'END:VCALENDAR'].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'ajay-weds-henna.ics'
  anchor.click()
  URL.revokeObjectURL(url)
}
