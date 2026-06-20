import BlogPost from "@/components/BlogPost";
import type { Post } from "@/lib/mdx";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid space-x-2 lg:grid-cols-2">
      {posts.map((item) => (
        <div className="py-5" key={item.slug}>
          <BlogPost post={item} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
