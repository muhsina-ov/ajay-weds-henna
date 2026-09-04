export const SITE_URL = 'https://ajay-henna.vercel.app'

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
  title: 'A connection built on understanding',
  paragraphs: [
    "Ajay and Henna's journey began with a simple meeting. What started as an introduction grew into a connection shaped by comfort, honesty, and the ease of truly talking to one another.",
    'In time, those conversations became the foundation of a meaningful partnership. On 04 October 2026, they begin their next chapter together, surrounded by the people they love.',
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
  anchor.download = 'ajay-henna-wedding.ics'
  anchor.click()
  URL.revokeObjectURL(url)
}
