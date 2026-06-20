import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <p className="py-3">
        This page does not exist.{" "}
        <Link href="/" className="underline hover:opacity-70">
          Go home
        </Link>
      </p>
    </Layout>
  );
}
