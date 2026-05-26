const fs = require('fs');

const socialProofPath = 'src/components/sections/SocialProof.tsx';
const featureTabsPath = 'src/components/sections/FeatureTabs.tsx';
const cssPath = 'src/app/globals.css';

const socialProof = `import Image from "next/image";
import Link from "next/link";

const STORIES = [
  {
    key: "mama",
    tag: "Food & Catering · Lagos",
    title: "Mama Chidi's Kitchen",
    story:
      "A home caterer who had been taking orders via WhatsApp alone. Now has a full menu online, accepts bookings, and reaches new customers daily.",
    image: "/assets/customer-stories/mama-chidi.webp",
    href: "/pricing?category=wordpress-hosting&billing=monthly",
    proofLabel: "New booking",
    proofTitle: "Sunday lunch for 12",
    proofMeta: "11:42 AM · Deposit confirmed",
    proofAction: "View order",
    proofItems: ["Online menu live", "2 repeat customers today"],
  },
  {
    key: "bb",
    tag: "Fashion & Retail · London",
    title: "The BB Bespokes",
    story:
      "A fabric designer selling textiles from her studio. She went from Instagram DMs to a WooCommerce storefront that ships across the UK and beyond.",
    image: "/assets/customer-stories/london-bespokes.webp",
    href: "/hosting/wordpress",
    proofLabel: "WooCommerce order",
    proofTitle: "+£148 · shipped to Manchester",
    proofMeta: "Royal Mail label created",
    proofAction: "View order",
    proofItems: ["2 Ankara sets", "Dispatch ETA: Friday"],
  },
  {
    key: "builders",
    tag: "Developers & Collaborators · Nano / Micro Instances",
    title: "Developers & Collaborators",
    story:
      "A small build team running Git, MongoDB, Docker, and shared project tooling on our Nano and Micro Instances. They ship collaboratively, keep costs lean, and spin up staging in minutes.",
    image: "/assets/customer-stories/dev-collaboration.jpg",
    href: "/hosting/vps",
    proofLabel: "Project stack",
    proofTitle: "Git · MongoDB · Docker",
    proofMeta: "Nano / Micro Instances",
    proofAction: "Open workspace",
    proofItems: ["3 contributors synced", "Staging deploy in 4 minutes"],
  },
] as const;

export function SocialProof() {
  return (
    <section className="story-section" id="stories">
      <div className="shell">
        <div className="story-section__head">
          <div className="story-section__head-left">
            <p className="story-section__eyebrow">Real businesses. Real results.</p>
            <h2 className="story-section__title">From Lagos kitchens to London ateliers.</h2>
          </div>
          <p className="story-section__sub">
            Business owners across Nigeria and the UK, live online in minutes, not months.
          </p>
        </div>
      </div>

      <div className="stories-stack-wrap" aria-label="Customer stories stack">
        <div className="shell stories-stack-stage">
          <div className="stories-stack-list">
            {STORIES.map((story, index) => (
              <article
                key={story.key}
                className={`story-slide story-slide--${story.key}`}
                aria-labelledby={`${story.key}-title`}
              >
                <div className="story-slide__media" aria-hidden="true">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    className="story-slide__image"
                    sizes="100vw"
                    priority={index === 0}
                  />
                  <div className="story-slide__wash" />
                </div>

                <p className="story-slide__tag">{story.tag}</p>

                <aside className="story-slide__proof" aria-hidden="true">
                  <span className="story-slide__proof-label">{story.proofLabel}</span>
                  <strong className="story-slide__proof-title">{story.proofTitle}</strong>
                  <p className="story-slide__proof-meta">{story.proofMeta}</p>
                  <div className="story-slide__proof-items">
                    {story.proofItems.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <span className="story-slide__proof-action">{story.proofAction}</span>
                </aside>

                <div className="story-slide__content">
                  <h3 id={`${story.key}-title`}>{story.title}</h3>
                  <p>{story.story}</p>
                  <Link href={story.href} className="story-slide__link">
                    Read the full story →
                  </Link>
                </div>

                <p className="story-slide__verified">Verified customer story</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`;

const storyCss = `.story-section {
  background: var(--bg);
  padding: 96px 0 112px;
}

.story-section__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 80px;
  align-items: end;
  margin-bottom: 52px;
}

.story-section__head-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.story-section__eyebrow {
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--blue);
  margin: 0;
}

.story-section__title {
  font-size: clamp(1.9rem, 3.6vw, 2.85rem);
  font-weight: 500;
  color: var(--ink);
  line-height: 1.08;
  letter-spacing: -0.04em;
  margin: 0;
  max-width: 16ch;
}

.story-section__sub {
  color: var(--body);
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  align-self: end;
  max-width: 34ch;
}

.stories-stack-wrap {
  --slides: 3;
  position: relative;
  height: calc(var(--slides) * 100svh);
}

.stories-stack-stage {
  position: relative;
  height: 100%;
}

.stories-stack-list {
  position: relative;
}

.story-slide {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  border-radius: 28px 28px 0 0;
  background: #121223;
  isolation: isolate;
  box-shadow: 0 -1px 0 rgb(255 255 255 / 20%) inset;
}

.story-slide::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: rgb(255 255 255 / 36%);
  z-index: 3;
}

.story-slide__media,
.story-slide__wash {
  position: absolute;
  inset: 0;
}

.story-slide__image {
  object-fit: cover;
  object-position: center center;
}

.story-slide__wash {
  background:
    linear-gradient(90deg, rgb(10 10 18 / 22%) 0%, rgb(10 10 18 / 12%) 28%, rgb(10 10 18 / 18%) 56%, rgb(10 10 18 / 74%) 100%),
    linear-gradient(180deg, rgb(10 10 18 / 2%) 0%, rgb(10 10 18 / 18%) 46%, rgb(10 10 18 / 82%) 100%);
  z-index: 1;
}

.story-slide--mama .story-slide__wash {
  background:
    linear-gradient(90deg, rgb(64 18 6 / 24%) 0%, rgb(64 18 6 / 12%) 28%, rgb(64 18 6 / 18%) 56%, rgb(17 10 9 / 76%) 100%),
    linear-gradient(180deg, rgb(122 42 16 / 4%) 0%, rgb(68 24 10 / 20%) 46%, rgb(17 10 9 / 82%) 100%);
}

.story-slide--bb .story-slide__wash {
  background:
    linear-gradient(90deg, rgb(28 25 34 / 22%) 0%, rgb(28 25 34 / 10%) 32%, rgb(28 25 34 / 16%) 58%, rgb(17 16 24 / 74%) 100%),
    linear-gradient(180deg, rgb(255 247 236 / 4%) 0%, rgb(38 34 42 / 16%) 44%, rgb(17 16 24 / 82%) 100%);
}

.story-slide--builders .story-slide__wash {
  background:
    linear-gradient(90deg, rgb(10 18 36 / 24%) 0%, rgb(10 18 36 / 10%) 32%, rgb(10 18 36 / 18%) 58%, rgb(8 12 22 / 76%) 100%),
    linear-gradient(180deg, rgb(20 72 116 / 4%) 0%, rgb(8 12 22 / 18%) 44%, rgb(8 12 22 / 84%) 100%);
}

.story-slide__tag {
  position: absolute;
  top: calc(var(--nav-h) + 26px);
  left: clamp(22px, 3vw, 44px);
  z-index: 2;
  margin: 0;
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 999px;
  background: rgb(255 255 255 / 10%);
  color: #fff;
  padding: 10px 16px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  backdrop-filter: blur(18px);
}

.story-slide__proof {
  position: absolute;
  left: clamp(22px, 3vw, 44px);
  top: clamp(188px, 28vh, 272px);
  z-index: 2;
  display: grid;
  gap: 12px;
  width: min(320px, calc(100vw - 48px));
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 22px;
  background: rgb(248 249 255 / 16%);
  padding: 18px 18px 16px;
  box-shadow: 0 24px 56px rgb(9 10 20 / 18%);
  backdrop-filter: blur(20px);
}

.story-slide--bb .story-slide__proof {
  top: clamp(210px, 34vh, 340px);
}

.story-slide--builders .story-slide__proof {
  top: clamp(178px, 26vh, 252px);
}

.story-slide__proof-label {
  color: rgb(255 255 255 / 72%);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.story-slide__proof-title {
  color: #fff;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.story-slide__proof-meta {
  margin: 0;
  color: rgb(255 255 255 / 74%);
  font-size: 13px;
  line-height: 1.5;
}

.story-slide__proof-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.story-slide__proof-items span {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: rgb(255 255 255 / 10%);
  color: rgb(255 255 255 / 94%);
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 500;
}

.story-slide__proof-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  border-radius: 999px;
  background: rgb(255 255 255 / 92%);
  color: var(--ink);
  padding: 9px 13px;
  font-size: 12px;
  font-weight: 600;
}

.story-slide__content {
  position: absolute;
  right: clamp(22px, 3vw, 48px);
  bottom: clamp(36px, 6vh, 72px);
  z-index: 2;
  display: grid;
  gap: 16px;
  width: min(520px, calc(100vw - 56px));
}

.story-slide__content h3 {
  margin: 0;
  color: #fff;
  font-size: clamp(2.25rem, 5vw, 4.5rem);
  font-weight: 500;
  line-height: 0.96;
  letter-spacing: -0.06em;
}

.story-slide__content p {
  margin: 0;
  max-width: 34ch;
  color: rgb(255 255 255 / 86%);
  font-family: var(--font-copy), serif;
  font-size: 16px;
  line-height: 1.7;
}

.story-slide__link {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.story-slide__link:hover {
  text-decoration: underline;
}

.story-slide__verified {
  position: absolute;
  left: clamp(22px, 3vw, 44px);
  bottom: clamp(36px, 6vh, 64px);
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  border-radius: 999px;
  background: rgb(255 255 255 / 10%);
  color: rgb(255 255 255 / 90%);
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(16px);
}

.story-slide__verified::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #49d17d;
  box-shadow: 0 0 0 4px rgb(73 209 125 / 16%);
}

@media (max-width: 960px) {
  .story-section__head {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .story-section__sub {
    max-width: 48ch;
  }
}

@media (max-width: 767px) {
  .story-section {
    padding: 64px 0 80px;
  }

  .story-section__head {
    margin-bottom: 32px;
  }

  .stories-stack-wrap {
    height: auto;
  }

  .stories-stack-stage,
  .stories-stack-list {
    height: auto;
  }

  .stories-stack-list {
    display: grid;
    gap: 18px;
  }

  .story-slide {
    position: relative;
    top: auto;
    height: min(90svh, 720px);
    min-height: 620px;
    border-radius: 24px;
  }

  .story-slide__tag {
    top: 20px;
    left: 20px;
    right: 20px;
    width: fit-content;
    max-width: calc(100% - 40px);
    padding: 9px 14px;
    font-size: 10.5px;
  }

  .story-slide__proof {
    left: 20px;
    right: 20px;
    top: auto;
    bottom: 212px;
    width: auto;
    max-width: min(82vw, 320px);
    padding: 16px;
  }

  .story-slide__content {
    left: 20px;
    right: 20px;
    bottom: 24px;
    width: auto;
    gap: 14px;
  }

  .story-slide__content h3 {
    font-size: clamp(2rem, 10vw, 3.1rem);
  }

  .story-slide__content p {
    max-width: none;
    font-size: 15px;
    line-height: 1.65;
  }

  .story-slide__verified {
    left: 20px;
    bottom: 164px;
    padding: 9px 13px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .story-slide {
    min-height: 590px;
  }

  .story-slide__proof {
    max-width: calc(100% - 40px);
    bottom: 220px;
  }

  .story-slide__verified {
    bottom: 176px;
  }
}
`;

fs.copyFileSync(socialProofPath, `${socialProofPath}.bak-20260525-stack`);
fs.copyFileSync(featureTabsPath, `${featureTabsPath}.bak-20260525-copy`);
fs.copyFileSync(cssPath, `${cssPath}.bak-20260525-stack`);

fs.writeFileSync(socialProofPath, socialProof);

let featureTabs = fs.readFileSync(featureTabsPath, 'utf8');
featureTabs = featureTabs.replace(
  'From idea to live website. Without the friction.',
  'From idea to your website, sorted. Your first year, free.'
);
featureTabs = featureTabs.replace(
  'No developer. No waiting. Pick a template, add your details, and publish before your coffee gets cold. Go online at the speed of your idea.',
  'Pick a name. Pick a template. Press publish.'
);
fs.writeFileSync(featureTabsPath, featureTabs);

let css = fs.readFileSync(cssPath, 'utf8');
const start = css.indexOf('.story-section {');
const end = css.indexOf('\n.quote-card__stars {');
if (start === -1 || end === -1 || end <= start) {
  throw new Error('Could not locate story-section CSS block');
}
css = css.slice(0, start) + storyCss + css.slice(end);
fs.writeFileSync(cssPath, css);