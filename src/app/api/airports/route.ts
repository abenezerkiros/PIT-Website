import { NextResponse } from "next/server";
import dataset from "../../../data/airports.json";
import { buildAirportIndex, searchAirportIndex } from "../../../lib/airport-search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Static server-only import bundles the compact dataset into the deployment.
// Run node scripts/update-airports.mjs before the first dev/build command.
const index = buildAirportIndex(dataset.airports);

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (query.length > 150) {
    return NextResponse.json({ error: "Search is too long", results: [] }, { status: 400 });
  }
  const results = searchAirportIndex(index, query);
  return NextResponse.json({ results, source: "OurAirports", updatedAt: dataset.updatedAt }, {
    // Do not store visitors' typed addresses in shared CDN caches.
    headers: { "Cache-Control": "private, no-store" },
  });
}
