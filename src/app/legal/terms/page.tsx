export const metadata = {
  title: "Terms of Service | OneNet Servers",
  description:
    "Terms of Service for OneNet Servers, trading name of ConqolX Technologies Limited. Read your rights and obligations as a customer.",
};

export default function TermsPage() {
  return (
    <>
      <div className="legal-header">
        <p className="legal-eyebrow">Terms of Service</p>
        <h1 className="legal-title">The rules that protect both of us.</h1>
        <p className="legal-meta">Effective 1 January 2026 · Last updated 1 March 2026</p>
        <p className="legal-intro">
          These Terms govern your use of services provided by <strong>ConqolX Technologies Limited</strong> (trading
          as OneNet Servers), registered in England &amp; Wales No. 14565201 and Nigeria No. 1775966. By
          purchasing or using our services you agree to these Terms in full.
        </p>
      </div>

      <div className="legal-card">
        <p className="legal-card__title">Quick reference</p>
        <table className="legal-table">
          <thead>
            <tr><th>Term</th><th>Detail</th></tr>
          </thead>
          <tbody>
            <tr><td>Billing</td><td>Prepaid, monthly or annual cycles</td></tr>
            <tr><td>Money-back guarantee</td><td>30 days on new hosting orders (not domains or SSL)</td></tr>
            <tr><td>Uptime SLA</td><td>99.9% monthly, with credits for excess downtime</td></tr>
            <tr><td>Invoice grace period</td><td>7 days before suspension; 30 days before termination</td></tr>
            <tr><td>Data backups</td><td>Daily, 14-day retention on shared hosting</td></tr>
            <tr><td>Notice of material changes</td><td>30 days by email before new terms take effect</td></tr>
            <tr><td>Governing law</td><td>England and Wales</td></tr>
          </tbody>
        </table>
      </div>

      <div className="legal-accordion">

        <details className="legal-accordion__item" open>
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">01</span>
            Services
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              OneNet Servers provides web hosting, domain registration, email hosting, SSL certificates,
              security services, and related infrastructure (&ldquo;Services&rdquo;). Specific service terms,
              acceptable use policies, and SLAs for individual products are incorporated by reference and
              available in your account dashboard.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">02</span>
            Account registration
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              You must register an account to purchase Services. You agree to provide accurate, current, and
              complete information and keep it updated. You are responsible for all activity under your
              account. Notify us immediately at <a href="mailto:support@onenetservers.net">support@onenetservers.net</a> if
              you suspect unauthorised access.
            </p>
            <p>You must be at least 18 years old. We reserve the right to terminate accounts found to belong to minors.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">03</span>
            Payment and billing
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>Services are prepaid. Renewal invoices are charged automatically unless you cancel before the renewal date.</p>
            <table className="legal-table">
              <thead><tr><th>Payment method</th><th>Available to</th></tr></thead>
              <tbody>
                <tr><td>Card via Stripe</td><td>UK and global customers</td></tr>
                <tr><td>Paystack</td><td>Nigerian customers</td></tr>
                <tr><td>Bank transfer</td><td>UK and Nigeria</td></tr>
              </tbody>
            </table>
            <p>
              Prices exclude applicable VAT. UK customers may be charged VAT at the prevailing rate. Invoices
              unpaid after 7 days may result in suspension; after 30 days in termination and data deletion.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">04</span>
            30-day money-back guarantee
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <table className="legal-table">
              <thead><tr><th>Covered by guarantee</th><th>Not covered</th></tr></thead>
              <tbody>
                <tr>
                  <td>
                    <ul>
                      <li>Web hosting</li>
                      <li>WordPress hosting</li>
                      <li>Reseller hosting</li>
                      <li>Cloud VPS</li>
                      <li>Business Email</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Domain registrations</li>
                      <li>SSL certificates</li>
                      <li>Add-on services</li>
                      <li>Renewal orders</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>Contact <a href="mailto:support@onenetservers.net">support@onenetservers.net</a> within 30 days. Refunds processed in 5–10 business days.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">05</span>
            Acceptable use
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>You agree not to use our Services to:</p>
            <ul>
              <li>Host or distribute illegal content, including IP-infringing material or content that incites violence.</li>
              <li>Send unsolicited bulk email (spam): results in immediate termination without refund.</li>
              <li>Conduct denial-of-service attacks, port scanning, or network intrusion.</li>
              <li>Mine cryptocurrency without prior written approval.</li>
              <li>Host phishing websites or distribute malware.</li>
              <li>Collect personal data without authorisation.</li>
            </ul>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">06</span>
            Uptime SLA and service credits
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>We commit to 99.9% monthly uptime, excluding scheduled maintenance, force majeure, and customer-caused outages.</p>
            <table className="legal-table">
              <thead><tr><th>Excess downtime in a month</th><th>Credit issued</th></tr></thead>
              <tbody>
                <tr><td>Up to 30 min</td><td>1 day&apos;s service fee</td></tr>
                <tr><td>31–60 min</td><td>2 days&apos; service fee</td></tr>
                <tr><td>61–120 min</td><td>3 days&apos; service fee</td></tr>
                <tr><td>Over 120 min</td><td>Up to 1 full month&apos;s fee (maximum)</td></tr>
              </tbody>
            </table>
            <p>Credits must be requested within 15 days of the end of the affected month.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">07</span>
            Data, backups, and intellectual property
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              Daily backups are performed and retained for 14 days on shared hosting. You retain ownership
              of all your data. Data is deleted within 30 days of account termination unless law requires
              retention.
            </p>
            <p>
              All software, interfaces, trademarks, and branding elements of OneNet Servers are the
              intellectual property of ConqolX Technologies Limited. You may not reproduce or distribute
              our materials without written permission.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">08</span>
            Limitation of liability, termination &amp; governing law
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              Our total liability shall not exceed fees paid by you in the 12 months preceding the claim.
              We are not liable for indirect or consequential damages including loss of profit or data.
            </p>
            <p>
              You may cancel at any time from your dashboard. We may terminate for breach without refund.
              Material changes to these Terms are notified 30 days in advance by email. These Terms are
              governed by the laws of England and Wales.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">09</span>
            Contact
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <table className="legal-table">
              <tbody>
                <tr><td>Company</td><td>ConqolX Technologies Limited</td></tr>
                <tr><td>UK registration</td><td>No. 14565201</td></tr>
                <tr><td>Nigeria registration</td><td>No. 1775966</td></tr>
                <tr><td>Email</td><td><a href="mailto:support@onenetservers.net">support@onenetservers.net</a></td></tr>
                <tr><td>UK</td><td>+44 7333 880 7775</td></tr>
                <tr><td>Nigeria</td><td>+234 201 330 9154</td></tr>
              </tbody>
            </table>
          </div>
        </details>

      </div>
    </>
  );
}
