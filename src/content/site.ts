// EVERYTHING on the site comes from this file: the name, the words, the products, and the links.
// To change the site, change this file. It is SAMPLE CONTENT right now (a placeholder brand and
// products) so the page looks finished while the real details are filled in.
//
// The ordering form (see `order` below) sends each order to Netlify Forms (which emails the owner), then
// sends the buyer to pay. Replace the SAMPLE pickup windows with the times that really work.

export interface Product {
  id: string;
  name: string;
  tagline: string;
  size: string;
  price: string;
  notes: string[];
  // How far one bottle goes, shown beside the size. Optional.
  servings?: string;
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
  id: 'venmo' | 'zelle' | 'cash';
  label: string;
  // The account to pay: the Venmo username (no @) or the email/phone number registered with Zelle (Zelle
  // has no pay link, so buyers are shown it). Cash has none.
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
      servings: 'Makes up to 32 cups',
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
    // The general pickup windows buyers can choose from. SAMPLE: replace with times that work for Evan.
    pickupWindows: [
      { id: 'weekday-evening', label: 'Weekday evenings (5-8 PM)' },
      { id: 'saturday-morning', label: 'Saturday morning (9 AM-12 PM)' },
      { id: 'saturday-afternoon', label: 'Saturday afternoon (12-5 PM)' },
      { id: 'sunday-afternoon', label: 'Sunday afternoon (1-5 PM)' },
    ] as PickupWindow[],
    // How buyers pay. With only one, the "payment type" step is skipped. Venmo opens a pay screen; Zelle shows
    // the buyer where to send it; Cash is brought to pick-up. Venmo and Zelle accounts are the real ones.
    payments: [
      { id: 'venmo', label: 'Venmo', handle: 'etwithner' },
      { id: 'zelle', label: 'Zelle', handle: 'etwithner@gmail.com' },
      { id: 'cash', label: 'Cash', handle: '' },
    ] as PaymentMethod[],
  },

  // How to serve it, between the story and the product.
  enjoy: {
    title: 'How to enjoy cold brew from Withner Coffee Co.',
    steps: [
      'Fill an 8 oz cup with ice',
      'Add 1 oz of cold brew',
      'Add 3 oz of water',
      'Adjust to your taste preference',
    ],
    // Shown under the steps.
    yield: 'One 32 oz bottle makes up to 32 cups.',
  },

  // The "About me" section after it, before ordering. SAMPLE words: replace with the real story.
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

  // Shown under the contact details on the order form and next to the contact form's send button.
  privacy: 'Your information is private and never sold.',

  footer: {
    tag: 'Brewed by the Withner Family in Jersey Village, Texas',
    // The web designer's credit, the last line of the page. Blank `name` to leave off.
    credit: { text: 'Website designed and managed by', name: 'Blake Lein', url: 'https://www.blakelein.com' },
  },
};
