import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getPostBySlug } from "../data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | OneNet Servers`,
    description: post.description,
    openGraph: {
      title: `${post.title} | OneNet Servers`,
      description: post.description,
      url: `https://onenetservers.net/blog/${post.slug}`,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderContent(raw: string) {
  const lines = raw.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i}><strong>{line.slice(2, -2)}</strong></p>);
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {listItems.map((item, j) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return (
              <li key={j}>
                {parts.map((part, k) =>
                  k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                )}
              </li>
            );
          })}
        </ul>
      );
      continue;
    } else if (line.trim() !== "") {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const hasLink = line.includes("[");
      if (hasLink) {
        const rendered = line.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          (_, text, href) => `<a href="${href}">${text}</a>`
        );
        elements.push(
          <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />
        );
      } else {
        elements.push(
          <p key={i}>
            {parts.map((part, k) =>
              k % 2 === 1 ? <strong key={k}>{part}</strong> : part
            )}
          </p>
        );
      }
    }

    i++;
  }

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="page-shell">
      <article className="blog-article">
        <div className="blog-article__hero">
          <div className="shell">
            <div className="blog-article__meta">
              <Link href="/blog" className="blog-article__back">
                ← Blog
              </Link>
              <span className="blog-article__category">{post.category}</span>
            </div>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__description">{post.description}</p>
            <div className="blog-article__byline">
              <div className="blog-article__author-avatar" aria-hidden="true">
                {post.author.charAt(0)}
              </div>
              <div>
                <strong>{post.author}</strong>
                <span>{post.authorRole}</span>
              </div>
              <div className="blog-article__byline-sep" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="blog-article__cover-wrap">
          <div className="blog-article__cover-placeholder" aria-hidden="true" />
        </div>

        <div className="shell blog-article__body">
          <div className="blog-article__content">
            {renderContent(post.content)}
          </div>
        </div>

        {related.length > 0 && (
          <div className="blog-article__related">
            <div className="shell">
              <h2 className="blog-article__related-title">Keep reading</h2>
              <div className="blog-cards-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-card blog-card--related">
                    <div className="blog-card__img-wrap">
                      <div className="blog-card__img-placeholder" aria-hidden="true" />
                    </div>
                    <div className="blog-card__body">
                      <span className="blog-card__category">{r.category}</span>
                      <h3 className="blog-card__title">{r.title}</h3>
                      <p className="blog-card__desc">{r.description}</p>
                      <span className="blog-card__read">{r.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
