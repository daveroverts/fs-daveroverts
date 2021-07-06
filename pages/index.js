import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";
import BlogPost from '../components/BlogPost'
import { NextSeo } from "next-seo";
import { getPlaiceholder } from "plaiceholder";

export default function Index({ posts }) {
  const title = 'Home'
  return (
    <>
      <NextSeo title={title} />
      <Layout title="Hello there! 👋" subtitle="I'm Dave Roverts, 24 years old and from the Netherlands 🇳🇱. Web developer 🖥 by day, and flight simmer ✈️ in the evening.">
        <div className="py-5">
          <h3 className="text-2xl font-bold">Latest posts</h3>
          <div className="grid space-x-2 lg:grid-cols-2">
            {posts.map((item) => (
              <div className="py-5" key={item.title}>
                <BlogPost post={item} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const initialPosts = await getAllFilesFrontMatter("posts");
  const posts2 = initialPosts.map(async (post) => {
    if (!post.banner) {
      return post;
    }

    const { base64, img } = await getPlaiceholder(post.banner);

    post.base64 = base64,
    post.img = img;
    return post;
  })
  
  const posts = await Promise.all(posts2)

  return { props: { posts } };
}
