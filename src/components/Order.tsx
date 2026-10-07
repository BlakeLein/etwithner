import { useEffect, useRef, useState, type FormEvent } from 'react';
import { site, type PaymentMethod } from '../content/site';
import { Ornament } from '../art/Art';

// The Venmo pay screen for the owner's account, with the amount and a note already filled in. Zelle and cash
// have no pay link, so they return null and the confirmation shows instructions instead.
function paymentUrl(method: PaymentMethod, amount: number, note: string): string | null {
  if (method.id !== 'venmo') return null;
  return `https://venmo.com/${method.handle}?txn=pay&amount=${amount}&note=${encodeURIComponent(note)}`;
}

function dollars(amount: number) {
  return `$${amount}`;
}

// A light checkout: pick a quantity, enter contact info, choose a payment type and a pickup window, then
// submit. On Netlify the order is stored there and emailed to the owner (the hidden copy of the form in
// index.html is how Netlify finds it), and a confirmation pops up with how to pay. Anywhere else the post is
// refused and the buyer is shown a link to email the order instead, so nothing is lost.
export default function Order() {
  const { order } = site;
  // Opening the page with ?test=1 shows the confirmation with sample details (add &payment=zelle or
  // &payment=cash to see those versions). Nothing is sent.
  const params = new URLSearchParams(window.location.search);
  const testing = params.get('test') === '1';
  const testPayment = order.payments.find((method) => method.id === params.get('payment'));
  const [quantity, setQuantity] = useState(testing ? 2 : 1);
  const [name, setName] = useState(testing ? 'Test Tester' : '');
  const [email, setEmail] = useState(testing ? 'test@example.com' : '');
  const [phone, setPhone] = useState(testing ? '(555) 555-0123' : '');
  const [pickup, setPickup] = useState(testing ? order.pickupWindows[0].id : '');
  const [paymentId, setPaymentId] = useState((testing && testPayment ? testPayment : order.payments[0]).id);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>(testing ? 'sent' : 'idle');
  const dialogRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const total = quantity * order.unitPrice;
  const payment = order.payments.find((method) => method.id === paymentId) ?? order.payments[0];
  const pickupLabel = order.pickupWindows.find((window) => window.id === pickup)?.label ?? '';
  const choosePayment = order.payments.length > 1;
  const summary = `${quantity} x ${order.itemLabel}`;
  const note = `${site.name}: ${summary}, pickup ${pickupLabel} (${name.trim()})`;
  const payUrl = paymentUrl(payment, total, note);
  const isCash = payment.id === 'cash';
  const open = status === 'sent';

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

  function closeModal() {
    setStatus('idle');
    setQuantity(1);
    setName('');
    setEmail('');
    setPhone('');
    setPickup('');
    setPaymentId(order.payments[0].id);
    submitRef.current?.focus();
  }

  // While the confirmation is open: lock the page scroll, focus the dialog, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button'));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
              Preferred pickup window
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
              <button ref={submitRef} type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : `Submit and move on to ${dollars(total)} payment`}
              </button>
              {status === 'failed' && (
                <p className="form-error" role="alert">
                  We couldn&rsquo;t send your order automatically. <a href={mailtoLink()}>Email it to us</a>.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
      {open && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            ref={dialogRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">
              &times;
            </button>
            <h3 id="order-modal-title">Thank you! There is only one more step.</h3>
            <p>
              {isCash
                ? 'We received your order! Please bring your payment with you to pick-up. We will reach out to you to finalize your pick-up time.'
                : 'We received your order! Please follow the instructions below to complete your payment. Once we receive your payment, we will reach out to you to finalize your pick-up time.'}
            </p>
            <dl className="modal-details">
              <dt>Name</dt>
              <dd>{name.trim()}</dd>
              <dt>Email</dt>
              <dd>{email.trim()}</dd>
              <dt>Phone</dt>
              <dd>{phone.trim()}</dd>
              <dt>Order</dt>
              <dd>{summary}</dd>
              <dt>Preferred Pick-up Window</dt>
              <dd>{pickupLabel}</dd>
              <dt>Payment</dt>
              <dd>{payment.label}</dd>
              <dt>Total</dt>
              <dd className="modal-total">{dollars(total)}</dd>
            </dl>
            {payUrl && (
              <a className="btn btn-primary" href={payUrl} target="_blank" rel="noopener noreferrer">
                Pay {dollars(total)} with Venmo
              </a>
            )}
            {payment.id === 'zelle' && (
              <div className="modal-pay">
                <p>
                  Send <strong>{dollars(total)}</strong> with Zelle to
                </p>
                <p className="modal-handle">{payment.handle}</p>
                <p>Put your name in the memo.</p>
              </div>
            )}
            {isCash && (
              <div className="modal-pay">
                <p>
                  Bring <strong>{dollars(total)}</strong> in cash to your pick-up.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
