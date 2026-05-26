export const metadata = {
  title: "Hosting Agreement | OneNet Servers",
  description:
    "OneNet Servers Hosting Agreement: SLA, resource limits, backup terms, migrations, and prohibited content for all hosting plans.",
};

export default function HostingAgreementPage() {
  return (
    <>
      <div className="legal-header">
        <p className="legal-eyebrow">Hosting Agreement</p>
        <h1 className="legal-title">What you get. What we expect.</h1>
        <p className="legal-meta">Effective 1 January 2026 · Last updated 1 March 2026</p>
        <p className="legal-intro">
          This Hosting Agreement is between you (&ldquo;Customer&rdquo;) and <strong>ConqolX Technologies
          Limited</strong> (trading as OneNet Servers). It governs shared hosting, WordPress hosting, reseller
          hosting, Cloud VPS, and business email. It supplements and is incorporated into our Terms of Service.
        </p>
      </div>

      {/* ── Shared hosting resource limits ── */}
      <div className="legal-card">
        <p className="legal-card__title">Shared hosting: resource limits</p>
        <table className="legal-table">
          <thead>
            <tr><th>Resource</th><th>Limit per account</th><th>Consequence of breach</th></tr>
          </thead>
          <tbody>
            <tr><td>CPU</td><td>25% of a single core per 60 seconds</td><td>Process throttling or account review</td></tr>
            <tr><td>MySQL connections</td><td>25 concurrent per database user</td><td>Connection errors for end users</td></tr>
            <tr><td>Inodes</td><td>300,000 (files + directories)</td><td>New file creation blocked</td></tr>
            <tr><td>Outbound email</td><td>500 per hour per account</td><td>Sending paused until next hour</td></tr>
            <tr><td>Cron jobs</td><td>5 concurrent; minimum 1-minute interval</td><td>Excess jobs queued or skipped</td></tr>
          </tbody>
        </table>
      </div>

      <div className="legal-accordion">

        <details className="legal-accordion__item" open>
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">01</span>
            Service availability and SLA
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>OneNet Servers guarantees <strong>99.9% monthly uptime</strong> for all hosting services. The SLA excludes:</p>
            <ul>
              <li>Scheduled maintenance (notified at least 24 hours in advance).</li>
              <li>Emergency maintenance to protect network integrity or security.</li>
              <li>Outages caused by force majeure events.</li>
              <li>Outages caused by actions or omissions of the Customer or their end users.</li>
            </ul>
            <p>
              If we fail to meet the SLA in a calendar month, request a service credit within 15 days by emailing <a href="mailto:support@onenetservers.net">support@onenetservers.net</a> with
              evidence of the outage. Credits are capped at one month&apos;s fees.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">02</span>
            Shared hosting: fair use
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              Shared hosting operates under a fair use policy. Resource limits are listed in the table above.
              Accounts consistently exceeding these limits may be moved to a higher plan or temporarily
              suspended to protect other customers. We will contact you before any action is taken where possible.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">03</span>
            Cloud VPS terms
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>Cloud VPS plans provide dedicated virtual resources. As root user, you are responsible for:</p>
            <ul>
              <li>Keeping the OS and installed software up to date.</li>
              <li>Configuring and maintaining a firewall.</li>
              <li>Implementing access controls. SSH key authentication is strongly recommended.</li>
            </ul>
            <table className="legal-table">
              <thead><tr><th>Bandwidth policy</th><th>Detail</th></tr></thead>
              <tbody>
                <tr><td>Measurement</td><td>Outbound transfer only; inbound is not counted</td></tr>
                <tr><td>Included</td><td>As specified per plan in your account dashboard</td></tr>
                <tr><td>Overage</td><td>Charged at the rate shown in your dashboard</td></tr>
              </tbody>
            </table>
            <p>Misuse of root access that damages shared infrastructure may result in immediate suspension.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">04</span>
            Backups
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <table className="legal-table">
              <thead><tr><th></th><th>Shared / WordPress / Reseller hosting</th><th>Cloud VPS</th></tr></thead>
              <tbody>
                <tr><td>Automated backups</td><td>Daily, included</td><td>Not included by default (add-on available)</td></tr>
                <tr><td>Retention period</td><td>14 days</td><td>As per add-on plan</td></tr>
                <tr><td>Restore via dashboard</td><td>Yes, up to 2 per month free</td><td>Yes if add-on enabled</td></tr>
                <tr><td>Extra restores</td><td>£10 per restoration above 2/month</td><td>Varies by plan</td></tr>
              </tbody>
            </table>
            <p>We strongly recommend all customers maintain independent backups. We do not accept liability for data loss on accounts without active backup.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">05</span>
            Free migrations
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>Free website migration is included with all hosting plans. We migrate:</p>
            <ul>
              <li>Up to 10 websites per account on shared and reseller plans.</li>
              <li>Full file and database content as-at the time of migration.</li>
              <li>From any cPanel, Plesk, DirectAdmin, or manually configured environment.</li>
            </ul>
            <p>
              Target completion: 48–72 hours after receiving access credentials. You are responsible for
              testing after migration and updating DNS to point to our servers.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">06</span>
            Prohibited content and activities
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>The following are prohibited on all OneNet Servers infrastructure:</p>
            <ul>
              <li>Copyright-infringing content (pirated software, media, publications).</li>
              <li>Adult or sexually explicit material without an approved adult hosting plan.</li>
              <li>Cryptocurrency mining without prior written approval.</li>
              <li>IRC servers or Tor exit nodes without prior written approval.</li>
              <li>Content illegal under UK or Nigerian law.</li>
              <li>Phishing, malware distribution, or botnet command-and-control.</li>
              <li>Sending unsolicited bulk email (spam).</li>
            </ul>
            <p>Violation may result in immediate termination without refund and referral to law enforcement.</p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">07</span>
            Email hosting
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>
              Business Email plans include mailbox storage as specified per plan. Email is delivered over
              SMTP/IMAP/POP3 with TLS encryption. We do not scan email content except for spam and
              malware filtering.
            </p>
            <p>
              Sending unsolicited bulk email is a serious breach of our Acceptable Use Policy and will
              result in immediate account termination. We cooperate with anti-spam organisations and may
              report abusive sending to relevant blocklists.
            </p>
          </div>
        </details>

        <details className="legal-accordion__item">
          <summary className="legal-accordion__trigger">
            <span className="legal-accordion__num">08</span>
            Suspension, termination &amp; changes
            <svg className="legal-accordion__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div className="legal-accordion__body">
            <p>We may suspend or terminate your service for:</p>
            <ul>
              <li>Non-payment after a 7-day grace period.</li>
              <li>Breach of the Acceptable Use Policy.</li>
              <li>Resource abuse affecting other customers.</li>
              <li>Court order or legal requirement.</li>
              <li>Immediate security threat to our infrastructure.</li>
            </ul>
            <p>
              We will provide advance notice where possible. For immediate security threats or legal
              requirements, suspension may occur without notice. Material changes to this Agreement are
              notified 30 days in advance.
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
