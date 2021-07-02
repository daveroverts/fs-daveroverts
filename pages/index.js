import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";
import BlogPost from '../components/BlogPost'

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
          <div className="grid space-x-2 md:grid-cols-2">
            {posts.map((item) => (
              <div className="py-5" key={item.title}>
              <BlogPost post={item}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("posts");

  return { props: { posts } };
}
