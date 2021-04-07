import Link from "next/link";

export default function Home({ accountName }) {
  return (
    <div>
      <h1>Welcome! </h1>
      <div>You are connected to {accountName}</div>
      <p>
        This app makes it easy to build dynamic relationships in the Knowledge
        Graph without manually keeping them up to date.
      </p>

      <div className="mt-4 border-t pt-4">
        Choose what type of dynamic relationship you want to set up
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link href="/nearby">
          <a className="border p-4 text-center block hover:bg-gray-50 rounded-sm">
            <div>Nearby Locations</div>
          </a>
        </Link>
      </div>
    </div>
  );
}
