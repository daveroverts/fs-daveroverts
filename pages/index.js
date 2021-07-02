import { format, parseISO } from "date-fns";
import Link from "next/link";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";

export default function Index({ posts }) {
  return (
    <Layout>
      <div className="py-5">
        <h3 className="text-2xl font-bold">Hello there! 👋</h3>
        <p className="font-semibold">I&apos;m Dave Roverts, 24 years old and from the Netherlands 🇳🇱. Web developer 🖥 by day, and flight simmer ✈️ in the evening.</p>
      </div>

      <div className="py-5">
        <h3 className="text-2xl font-bold">Latest posts</h3>
        <div>
          {posts.map((item) => (
            <div className="py-5" key={item.title}>
              <Link href={`/posts/${item.slug}`}>
                <a className="text-xl hover:underline">{item.title}</a>
              </Link>
              <h5 className="text-lg">{item.date}</h5>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("posts");

  return { props: { posts } };
}
