import Link from "next/link";

export default function Home({ accountName }) {
  return (
    <div>
      <h1>Welcome {accountName}!</h1>
      <p className="text-gray-500">
        This app makes it easy to build dynamic relationships in the Knowledge
        Graph without manually keeping them up to date.
      </p>

      <div className="mt-4 border-t pt-4">
        Choose what type of dynamic relationship you want to set up
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link href="/nearby">
          <a className="card">
            <h3>Nearby Locations</h3>
          </a>
        </Link>
        <div className="card-disabled">
          <h3>Location Directory</h3>
          <div className="text-xs">Coming Soon</div>
        </div>
        <div className="card-disabled">
          <h3>Product Category</h3>
          <div className="text-xs">Coming Soon</div>
        </div>
        <div className="card-disabled">
          <h3>Related Products</h3>
          <div className="text-xs">Coming Soon</div>
        </div>
      </div>
    </div>
  );
}
