// EVERYTHING on the site comes from this file: the name, the words, the products, and the links.
// To change the site, change this file. It is SAMPLE CONTENT right now (a placeholder brand and
// products) so the page looks finished while the real details are filled in.
//
// The ordering form (see `order` below) emails each order to the owner through a form service, then sends
// the buyer to pay. Fill in `order.endpoint` to turn that on (see the README), and replace the SAMPLE
// pickup windows with the times that really work.

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

// What one bottle costs, in dollars. The product card and the ordering form both use it.
const UNIT_PRICE = 10;

export interface PickupWindow {
  id: string;
  label: string;
}

export interface PaymentMethod {
  id: 'venmo' | 'cashapp' | 'paypal' | 'zelle';
  label: string;
  // The account to pay: the Venmo username (no @), the Cash App cashtag (no $), the PayPal.Me name, or
  // the email/phone number registered with Zelle (Zelle has no pay link, so buyers are shown it instead).
  handle: string;
}

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
      price: `$${UNIT_PRICE}`,
      notes: ['Dark chocolate', 'Toasted nut', 'Smooth finish'],
    },
  ] as Product[],

  // The ordering form: quantity, contact info, pickup window, then submit and pay.
  order: {
    title: 'Place your order',
    unitPrice: UNIT_PRICE,
    maxQuantity: 12,
    itemLabel: '32 oz Cold Brew',
    // Where each order is sent so it lands in the owner's email: a form-service URL such as
    // https://formspree.io/f/XXXXXXXX (it emails whoever owns that form). Blank = not set up yet, and the
    // form falls back to letting the buyer email the order themselves.
    endpoint: '',
    // The general pickup windows buyers can choose from. SAMPLE: replace with times that work for Evan.
    pickupWindows: [
      { id: 'weekday-evening', label: 'Weekday evenings (5-8 PM)' },
      { id: 'saturday-morning', label: 'Saturday morning (9 AM-12 PM)' },
      { id: 'saturday-afternoon', label: 'Saturday afternoon (12-5 PM)' },
      { id: 'sunday-afternoon', label: 'Sunday afternoon (1-5 PM)' },
    ] as PickupWindow[],
    // How buyers pay. With only one, the "payment type" step is skipped. MOCK-UP: only the Venmo handle is
    // real; the others are placeholders. Delete a line to drop that option (or all but one to drop the step).
    payments: [
      { id: 'venmo', label: 'Venmo', handle: 'etwithner' },
      { id: 'cashapp', label: 'Cash App', handle: 'etwithner' },
      { id: 'paypal', label: 'PayPal', handle: 'etwithner' },
      { id: 'zelle', label: 'Zelle', handle: 'hello@example.com' },
    ] as PaymentMethod[],
  },

  // The "About me" section between the product and ordering. SAMPLE words: replace with the real story.
  about: {
    title: 'About me',
    paragraphs: [
      'Hi, I am Evan. Cold brew started as a weekend habit in our kitchen and turned into something I could not stop tinkering with: a different grind, a longer steep, one more taste test with the family.',
      'Now I make every batch myself, a little at a time, and I love handing someone a bottle and hearing what they thought. Thank you for supporting a small, family-run coffee business.',
    ],
  },

  contact: {
    title: 'Get in touch',
    // The choices in the "Reason for contact" menu.
    reasons: ['Order Inquiry', 'Need Support', 'Feedback'],
    // Where the form's message goes. Replace with the real address.
    to: 'hello@example.com',
  },

  footer: {
    tag: 'Brewed by the Withner Family in Jersey Village, Texas',
  },
};
