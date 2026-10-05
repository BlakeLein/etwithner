// EVERYTHING on the site comes from this file: the name, the words, the products, and the links.
// To change the site, change this file. It is SAMPLE CONTENT right now (a placeholder brand and
// products) so the page looks finished while the real details are filled in.
//
// Links with an empty `url` are simply left off the page, so a link can be removed by blanking it.
// The Venmo and calendar links below are generic placeholders: replace them with the real ones
// (for Venmo: https://venmo.com/u/THEIR-HANDLE; for a calendar: a Google Calendar appointment page,
// Calendly, or any booking link).

export interface Product {
  id: string;
  name: string;
  tagline: string;
  size: string;
  price: string;
  notes: string[];
  // A small ribbon on the card, like "Bestseller". Optional.
  badge?: string;
}

export interface OrderLink {
  id: 'venmo' | 'calendar' | 'text' | 'email';
  label: string;
  description: string;
  url: string;
}

export const site = {
  name: 'Ember & Pine',
  descriptor: 'Cold Brew Coffee',
  tagline: 'Slow-steeped. Small batch. Made for the trail and the porch.',
  intro:
    'Cold brew steeped for eighteen hours, bottled by hand, and poured with a little respect for the outdoors.',

  story: {
    title: 'Steeped slow, made simple',
    paragraphs: [
      'We steep coarse-ground beans in cold water for eighteen hours, strain them twice, and bottle every batch by hand. The result is smooth, low in acid, and strong enough to start a long day, with none of the bitterness.',
      'No shortcuts and no syrups, just good beans, clean water, and time. Pour it over ice, stir in a little cream, or take it straight from the cooler at the trailhead.',
    ],
    highlights: [
      { title: 'Eighteen-hour steep', text: 'Time does the work, so the flavor comes out round and sweet.' },
      { title: 'Low acid, big flavor', text: 'Easy on the stomach and still rich enough to stand up to ice.' },
      { title: 'Bottled by hand', text: 'Small batches, so every bottle is fresh when you pick it up.' },
    ],
  },

  products: [
    {
      id: 'trailhead',
      name: 'The Trailhead',
      tagline: 'Our original black cold brew.',
      size: '16 oz bottle',
      price: '$6',
      notes: ['Dark chocolate', 'Toasted nut', 'Smooth finish'],
      badge: 'Bestseller',
    },
    {
      id: 'campfire',
      name: 'Campfire',
      tagline: 'Cold brew with vanilla bean and a hint of smoke.',
      size: '16 oz bottle',
      price: '$7',
      notes: ['Vanilla bean', 'Caramel', 'Warm and toasty'],
    },
    {
      id: 'big-pour',
      name: 'The Big Pour',
      tagline: 'Half a gallon for the whole camp, or the whole week.',
      size: '64 oz jug',
      price: '$22',
      notes: ['Same smooth brew', 'Best value', 'Keeps a week cold'],
    },
  ] as Product[],

  order: {
    title: 'How to order',
    intro: 'No checkout and no accounts. Pick a brew, pay with Venmo, and grab a pickup time.',
    steps: [
      { title: 'Pick your brew', text: 'Choose a bottle or a jug above.' },
      { title: 'Pay with Venmo', text: 'Send the total, with your order in the note.' },
      { title: 'Choose a pickup time', text: 'Grab an open slot on the calendar.' },
    ],
    links: [
      {
        id: 'venmo',
        label: 'Pay with Venmo',
        description: 'Send payment and put your order in the note.',
        url: 'https://venmo.com/',
      },
      {
        id: 'calendar',
        label: 'Pickup calendar',
        description: 'See the open pickup times and pick one that works.',
        url: 'https://calendar.google.com/',
      },
      {
        id: 'text',
        label: 'Text us',
        description: 'Questions or a special order? Send a quick text.',
        url: '',
      },
      {
        id: 'email',
        label: 'Email us',
        description: 'Prefer email? We read every message.',
        url: 'mailto:hello@example.com',
      },
    ] as OrderLink[],
  },

  feedback: {
    title: 'Tell us how it went',
    intro: 'Loved it? Want something different? A quick note helps us brew better.',
    // Where feedback is sent. The form opens the visitor's email app with their note filled in, so
    // there is no server to run. Replace with the real address.
    to: 'hello@example.com',
  },

  footer: {
    note: 'Brewed in small batches. Poured with care.',
  },
};
