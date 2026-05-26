import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/blog/data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogSection() {
  return (
    <section className="homepage-section blog-section">
      <div className="shell">
        <div className="blog-section__header">
          <div>
            <p className="section-eyebrow">Latest insights</p>
            <h2 className="section-title">From the blog</h2>
            <p className="blog-section__lead">Guides, updates, and ideas for founders building online.</p>
          </div>
          <Link href="/blog" className="blog-section__all-link">
            View all articles →
          </Link>
        </div>

        <div className="blog-cards-grid">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card__img-wrap">
                <Image
                  src={post.image}
                  alt={`${post.title} article cover`}
                  fill
                  className="blog-card__img"
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
              <div className="blog-card__body">
                <span className="blog-card__category">{post.category}</span>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__desc">{post.description}</p>
                <div className="blog-card__footer">
                  <span className="blog-card__author">{post.author}</span>
                  <span className="blog-card__sep" aria-hidden="true" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="blog-card__sep" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
