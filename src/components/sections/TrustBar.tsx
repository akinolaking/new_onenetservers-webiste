import Image from "next/image";

const partners = [
  {
    name: "Amazon Web Services",
    src: "/assets/partners/trimmed/aws.png",
    width: 564,
    height: 337,
  },
  {
    name: "Itana",
    src: "/assets/partners/trimmed/itana.png",
    width: 200,
    height: 44,
  },
  {
    name: "NiRA",
    src: "/assets/partners/trimmed/nira.png",
    width: 637,
    height: 280,
  },
  {
    name: "Tech Cabal",
    src: "/assets/partners/trimmed/tech-cabal.png",
    width: 580,
    height: 130,
  },
  {
    name: "Tech Nation",
    src: "/assets/partners/trimmed/tech-nation.png",
    width: 5369,
    height: 2908,
  },
  {
    name: "UK Home Office",
    src: "/assets/partners/trimmed/home-office.png",
    width: 741,
    height: 177,
  },
] as const;

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Trusted partners and media mentions">
      <div className="trust-bar__shell shell">
        <p className="trust-bar__eyebrow">
          Backed, Featured and Trusted by Top media, organisations and industry leaders
        </p>

        <div className="trust-bar__logos" role="list" aria-label="Partners and media logos">
          {partners.map((partner) => (
            <div key={partner.name} className="trust-bar__logo-item" role="listitem" aria-label={partner.name}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="trust-bar__logo-image"
                sizes="(max-width: 640px) 148px, (max-width: 1100px) 24vw, 14vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
