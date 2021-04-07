import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>Knowledge Graph Dynamic Relationships</h1>
      <p>
        This app makes it easy to build dynamic relationships in the Knowledge
        Graph without manually keeping them up to date.
      </p>
      <Link href="/api/auth/start">
        <a className="button mt-2">Connect to Yext</a>
      </Link>
    </div>
  );
}
