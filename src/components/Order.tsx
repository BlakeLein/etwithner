import { useState, type FormEvent } from 'react';
import { site, type PaymentMethod } from '../content/site';
import { Ornament } from '../art/Art';

// Where to send the buyer to pay, with the amount (and a note, where the app allows one) already filled in.
// Zelle has no pay link, so it returns null and the buyer is shown who to send the money to.
function paymentUrl(method: PaymentMethod, amount: number, note: string): string | null {
  switch (method.id) {
    case 'venmo':
      return `https://venmo.com/${method.handle}?txn=pay&amount=${amount}&note=${encodeURIComponent(note)}`;
    case 'cashapp':
      return `https://cash.app/$${method.handle}/${amount}`;
    case 'paypal':
      return `https://paypal.me/${method.handle}/${amount}USD`;
    case 'zelle':
      return null;
  }
}

function dollars(amount: number) {
  return `$${amount}`;
}

// A light checkout: pick a quantity, enter contact info, choose a payment type and a pickup window, then
// submit. On Netlify the order is stored there and emailed to the owner (the hidden copy of the form in
// index.html is how Netlify finds it), and the buyer is sent on to pay. Anywhere else the post is refused
// and the buyer is shown a link to email the order instead, so nothing is lost.
export default function Order() {
  const { order } = site;
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [paymentId, setPaymentId] = useState(order.payments[0].id);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const total = quantity * order.unitPrice;
  const payment = order.payments.find((method) => method.id === paymentId) ?? order.payments[0];
  const pickupLabel = order.pickupWindows.find((window) => window.id === pickup)?.label ?? '';
  const choosePayment = order.payments.length > 1;
  const summary = `${quantity} x ${order.itemLabel}`;
  const note = `${site.name}: ${summary}, pickup ${pickupLabel} (${name.trim()})`;
  const payUrl = paymentUrl(payment, total, note);
  const zelleHow = `send ${dollars(total)} with Zelle to ${payment.handle} and put your name in the memo`;

  function mailtoLink() {
    const lines = [
      `Order: ${summary} (${dollars(total)})`,
      `Pickup: ${pickupLabel}`,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Payment: ${payment.label}`,
    ];
    return `mailto:${site.contact.to}?subject=${encodeURIComponent(`New order: ${summary} (${dollars(total)})`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim() === '' || !/^\S+@\S+\.\S+$/.test(email.trim()) || phone.replace(/\D/g, '').length < 10 || pickup === '') {
      setError('Please add your name, a valid email, a phone number, and choose a pickup window.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const body = new URLSearchParams({
        'form-name': 'orders',
        'bot-field': '',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        quantity: String(quantity),
        item: order.itemLabel,
        total: dollars(total),
        pickup: pickupLabel,
        payment: payment.label,
      });
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('not ok');
      setStatus('sent');
      if (payUrl) window.location.href = payUrl;
    } catch {
      setStatus('failed');
    }
  }

  let step = 0;
  const nextStep = () => ++step;

  return (
    <section className="section tint" id="order">
      <div className="wrap">
        <p className="kicker">Order</p>
        <h2>{order.title}</h2>
        <Ornament />
        <form className="checkout" onSubmit={submit} noValidate>
          <fieldset className="check-step">
            <legend>
              <span className="step-num" aria-hidden="true">{nextStep()}</span>
              Your order
            </legend>
            <div className="qty-row">
              <div className="qty" role="group" aria-label="Quantity">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="One fewer" disabled={quantity <= 1}>
                  &minus;
                </button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={() => setQuantity((q) => Math.min(order.maxQuantity, q + 1))} aria-label="One more" disabled={quantity >= order.maxQuantity}>
                  +
                </button>
              </div>
              <p className="qty-label">
                {order.itemLabel} <span>{dollars(order.unitPrice)} each</span>
              </p>
              <p className="qty-total" aria-live="polite">
                {dollars(total)}
              </p>
            </div>
          </fieldset>

          <fieldset className="check-step">
            <legend>
              <span className="step-num" aria-hidden="true">{nextStep()}</span>
              Your info
            </legend>
            <div className="check-fields">
              <label className="field">
                <span>Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </label>
              <label className="field">
                <span>Phone</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </label>
            </div>
          </fieldset>

          {choosePayment && (
            <fieldset className="check-step">
              <legend>
                <span className="step-num" aria-hidden="true">{nextStep()}</span>
                Payment type
              </legend>
              <div className="choices">
                {order.payments.map((method) => (
                  <label key={method.id} className="choice">
                    <input type="radio" name="payment" checked={paymentId === method.id} onChange={() => setPaymentId(method.id)} />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="check-step">
            <legend>
              <span className="step-num" aria-hidden="true">{nextStep()}</span>
              Pickup time
            </legend>
            <div className="choices">
              {order.pickupWindows.map((window) => (
                <label key={window.id} className="choice">
                  <input type="radio" name="pickup" checked={pickup === window.id} onChange={() => setPickup(window.id)} />
                  <span>{window.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="check-submit">
            <span className="step-num" aria-hidden="true">{nextStep()}</span>
            <div className="check-submit-body">
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="btn btn-primary" disabled={status === 'sending' || status === 'sent'}>
                {status === 'sending' ? 'Sending…' : status === 'sent' ? (payUrl ? 'Taking you to pay…' : 'Order sent') : `Submit order and pay ${dollars(total)}`}
              </button>
              {status === 'sent' && (
                <p className="form-ok" role="status">
                  {payUrl ? (
                    <>
                      Order sent! If nothing happens, <a href={payUrl}>pay with {payment.label} here</a>.
                    </>
                  ) : (
                    <>Order sent! {zelleHow[0].toUpperCase() + zelleHow.slice(1)}.</>
                  )}
                </p>
              )}
              {status === 'failed' && (
                <p className="form-error" role="alert">
                  We couldn&rsquo;t send your order automatically. <a href={mailtoLink()}>Email it to us</a>, then{' '}
                  {payUrl ? (
                    <a href={payUrl} target="_blank" rel="noopener noreferrer">
                      pay with {payment.label}
                    </a>
                  ) : (
                    zelleHow
                  )}
                  .
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
