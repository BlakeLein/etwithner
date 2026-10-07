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

// Venmo: the handle and what one bottle costs. `venmoUrl` opens Venmo's pay screen for that account with
// the amount and a note already filled in (the buyer can still change the amount for more bottles).
const VENMO_HANDLE = 'etwithner';
const VENMO_AMOUNT = '10';
const VENMO_NOTE = 'Withner Coffee Co. cold brew (32 oz)';
export const venmoUrl = `https://venmo.com/${VENMO_HANDLE}?txn=pay&amount=${VENMO_AMOUNT}&note=${encodeURIComponent(VENMO_NOTE)}`;

// While the site is under development it sits behind a simple password page. This is a casual
// "keep the curious out" gate, not real security: the password is in the page's own code, so anyone
// who looks at the source can read it. Set `enabled` to false (and delete the noindex line in
// index.html) when the site is ready to be public.
export const gate = {
  enabled: false,
  password: 'etwithner2026',
  storageKey: 'etwithner_auth',
};

export const site = {
  name: 'Withner Coffee Co.',
  // The person behind the brand, credited in the hero, the story, and the footer. Blank to leave off.
  maker: 'Evan Withner',
  descriptor: 'Cold Brew',
  // The thin colored bar above the navigation. Blank to leave off.
  announcement: '',
  tagline: 'Slow-steeped. Small batch. Smooth every time.',
  intro:
    'Cold brew steeped for eighteen hours, bottled by hand, and made to be poured over ice.',

  story: {
    title: 'Steeped slow, made simple',
    paragraphs: [
      'We steep coarse-ground beans in cold water for eighteen hours, strain them twice, and bottle every batch by hand. The result is smooth, low in acid, and strong enough to start a long day, with none of the bitterness.',
      'No shortcuts and no syrups, just good beans, clean water, and time. Pour it over ice, stir in a little cream, or drink it straight from the bottle.',
    ],
    highlights: [
      { title: 'Eighteen-hour steep', text: 'Time does the work, so the flavor comes out round and sweet.' },
      { title: 'Low acid, big flavor', text: 'Easy on the stomach and still rich enough to stand up to ice.' },
      { title: 'Bottled by hand', text: 'Small batches, so every bottle is fresh when you pick it up.' },
    ],
  },

  // The one thing we sell. (The page is laid out for a single product.)
  products: [
    {
      id: 'cold-brew',
      name: 'Cold Brew',
      tagline: 'Eighteen hours of steeping in every bottle. Smooth, low acid, and ready to pour over ice.',
      size: '32 oz bottle',
      price: '$10',
      notes: ['Dark chocolate', 'Toasted nut', 'Smooth finish'],
    },
  ] as Product[],

  order: {
    title: 'How to order',
    intro: 'No checkout and no accounts. Pick a brew, pay with Venmo, and grab a pickup time.',
    steps: [
      { title: 'Choose how many', text: '$10 per 32 oz bottle. Change the amount in Venmo for more.' },
      { title: 'Pay with Venmo', text: 'The button opens Venmo with the amount and a note filled in.' },
      { title: 'Choose a pickup time', text: 'Grab an open slot on the calendar.' },
    ],
    links: [
      {
        id: 'venmo',
        label: 'Pay with Venmo',
        description: 'Opens Venmo to pay @etwithner, with $10 and a note filled in.',
        url: venmoUrl,
      },
      {
        id: 'calendar',
        label: 'Pickup calendar',
        description: 'See the open pickup times and pick one that works.',
        url: 'https://calendar.google.com/',
      },
    ] as OrderLink[],
  },

  // The "About me" section between the brews and ordering. SAMPLE words: replace with the real story.
  about: {
    title: 'About me',
    paragraphs: [
      'Hi, I am Evan. Cold brew started as a weekend habit in our kitchen and turned into something I could not stop tinkering with: a different grind, a longer steep, one more taste test with the family.',
      'Now I make every batch myself, a little at a time, and I love handing someone a bottle and hearing what they thought. Thank you for supporting a small, family-run coffee business.',
    ],
  },

  contact: {
    title: 'Get in touch',
    intro: 'Questions, a special order, or just want to say hi? Send a note and we will get back to you.',
    // Where the form's message goes. Replace with the real address.
    to: 'hello@example.com',
  },

  footer: {
    note: 'Brewed in small batches. Poured with care.',
    tag: 'Brewed by the Withner Family in Jersey Village, Texas',
  },
};
