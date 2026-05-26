export const metadata = {
  title: "Privacy Policy | OneNet Servers",
  description:
    "Privacy Policy for OneNet Servers: how we collect, use, and protect your personal data under UK GDPR and Nigerian data protection law.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="legal-header">
        <p className="legal-eyebrow">Privacy Policy</p>
        <h1 className="legal-title">Your data. Your rights. Our obligations.</h1>
        <p className="legal-meta">Effective 1 January 2026 · Last updated 1 March 2026</p>
        <p className="legal-intro">
          This Privacy Policy explains how <strong>ConqolX Technologies Limited</strong> (trading as
          OneNet Servers, UK RC: 14565201 · Nigeria RC: 1775966) collects, uses, and protects your
          personal data. We are registered with the UK ICO as a data controller. This Policy complies
          with UK GDPR, the Data Protection Act 2018, and the Nigeria Data Protection Regulation (NDPR).
        </p>
      </div>

      {/* ── Data we collect — table ── */}
      <div className="legal-card">
        <p className="legal-card__title">Data we collect at a glance</p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Data collected</th>
              <th>Legal basis</th>
              <th>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account</td>
              <td>Name, email, billing address, phone</td>
              <td>Contract</td>
              <td>Duration + 7 years</td>
            </tr>
            <tr>
              <td>Payment</td>
              <td>Transaction IDs, invoices (no card numbers stored)</td>
              <td>Legal obligation</td>
              <td>7 years</td>
            </tr>
            <tr>
              <td>Domain registrant</td>
              <td>WHOIS registrant details (ICANN/NiRA required)</td>
              <td>Legal obligation</td>
              <td>Duration + 2 years</td>
            </tr>
            <tr>
              <td>Usage</td>
              <td>IP address, browser, pages visited, referrer</td>
              <td>Legitimate interest</td>
              <td>12 months</td>
            </tr>
            <tr>
              <td>Support</td>
              <td>Ticket content, chat transcripts, emails</td>
              <td>Contract</td>
              <td>3 years</td>
            </tr>
            <tr>
              <td>Cookies</td>
              <td>Session, preference, analytics cookies</td>
              <td>Consent</td>
              <td>Up to 12 months</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="legal-accordion">

        <details className="legal-accordion__item" open>
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">01</span>
            How we use your data
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <ul>
              <li>Provide, maintain, and improve our Services.</li>
              <li>Process payments and issue invoices.</li>
              <li>Register and manage domain names on your behalf.</li>
              <li>Communicate about your account, services, and support requests.</li>
              <li>Send service notifications, renewal reminders, and security alerts.</li>
              <li>Comply with legal obligations including tax law, ICANN policy, and NiRA requirements.</li>
              <li>Detect and prevent fraud, abuse, and security threats.</li>
              <li>Send marketing communications where you have consented (opt out at any time).</li>
            </ul>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">02</span>
            Data sharing
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <table className="legal-table">
              <thead><tr><th>Recipient</th><th>Purpose</th><th>Safeguard</th></tr></thead>
              <tbody>
                <tr><td>Stripe / Paystack</td><td>Payment processing</td><td>Own privacy policies &amp; PCI DSS</td></tr>
                <tr><td>ICANN / NiRA / registries</td><td>Domain registration</td><td>Policy obligation</td></tr>
                <tr><td>Infrastructure providers</td><td>Hosting and email delivery</td><td>Data processing agreements</td></tr>
                <tr><td>Law enforcement</td><td>Legal requirement or court order</td><td>Only when required by law</td></tr>
              </tbody>
            </table>
            <p><strong>We do not sell your personal data to third parties.</strong></p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">03</span>
            International transfers
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              We operate in the UK and Nigeria. Your data may be processed in both jurisdictions and in
              EU and US data centres operated by our infrastructure providers. Where data is transferred
              outside the UK or EEA, we ensure appropriate safeguards are in place, including Standard
              Contractual Clauses or adequacy decisions.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">04</span>
            Your rights
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <table className="legal-table">
              <thead><tr><th>Right</th><th>What it means</th></tr></thead>
              <tbody>
                <tr><td>Access</td><td>Request a copy of the personal data we hold about you</td></tr>
                <tr><td>Rectification</td><td>Correct inaccurate or incomplete data</td></tr>
                <tr><td>Erasure</td><td>Request deletion where data is no longer necessary</td></tr>
                <tr><td>Restriction</td><td>Limit our processing in certain circumstances</td></tr>
                <tr><td>Portability</td><td>Receive your data in a structured, machine-readable format</td></tr>
                <tr><td>Object</td><td>Object to processing based on legitimate interests or direct marketing</td></tr>
                <tr><td>Withdraw consent</td><td>Opt out of marketing or non-essential cookies at any time</td></tr>
              </tbody>
            </table>
            <p>
              To exercise any right, email <a href="mailto:privacy@onenetservers.net">privacy@onenetservers.net</a>.
              We respond within 30 days. You may also lodge a complaint with the UK ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>) or
              the Nigeria Data Protection Commission.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">05</span>
            Cookies
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <table className="legal-table">
              <thead><tr><th>Type</th><th>Purpose</th><th>Can be declined?</th></tr></thead>
              <tbody>
                <tr><td>Essential</td><td>Session management, security, cart</td><td>No, required for service</td></tr>
                <tr><td>Analytics</td><td>Page views, traffic sources</td><td>Yes</td></tr>
                <tr><td>Preference</td><td>Currency, language</td><td>Yes</td></tr>
              </tbody>
            </table>
            <p>Manage cookie preferences at any time via the cookie settings link in the footer. Declining optional cookies does not affect service access.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">06</span>
            Security
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <ul>
              <li>TLS encryption for all data in transit.</li>
              <li>AES-256 encryption at rest for sensitive data.</li>
              <li>Passwords are stored as bcrypt hashes. We never see your plain-text password.</li>
              <li>Two-factor authentication available on all accounts.</li>
              <li>Regular third-party security audits.</li>
            </ul>
            <p>If you discover a security issue, contact <a href="mailto:security@onenetservers.net">security@onenetservers.net</a> immediately.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">07</span>
            Changes and contact
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>Material changes to this Policy are notified by email at least 30 days before taking effect.</p>
            <table className="legal-table">
              <tbody>
                <tr><td>Data protection enquiries</td><td><a href="mailto:privacy@onenetservers.net">privacy@onenetservers.net</a></td></tr>
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
