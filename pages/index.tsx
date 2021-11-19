import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>Graph Viewer 5000</h1>
      <p>
        Welcome to the Graph Viewer 5000. This app allows you to vizualize your
        entire Yext Knowledge Graph.
      </p>
      <Link href="/api/auth/start">
        <a className="btn mt-2">Connect to Yext</a>
      </Link>
    </div>
  );
}
