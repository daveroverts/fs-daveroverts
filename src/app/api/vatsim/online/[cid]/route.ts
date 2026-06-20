import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

interface OnlineMember {
  cid: number;
  callsign: string;
}

interface Controller extends OnlineMember {
  facility: number;
  frequency: string | null;
}

interface Pilot extends OnlineMember {
  flight_plan: {
    departure: string;
    arrival: string;
  };
}

interface VatsimStatus {
  callsign: string | null;
  role: string | null;
  roleData: string | null;
}

// The VATSIM data feed is ~2.5MB — over Next's 2MB fetch data-cache limit, so
// it can't be cached directly (and trying logs a warning). Fetch it fresh and
// cache the small extracted result instead via unstable_cache below.
async function fetchOnlineStatus(cid: string): Promise<VatsimStatus> {
  const statusRes = await fetch("https://status.vatsim.net/status.json", {
    cache: "no-store",
  });
  const statusJson = await statusRes.json();
  const dataFeeds: string[] = statusJson.data.v3;
  const dataFeed = dataFeeds[Math.floor(Math.random() * dataFeeds.length)];

  const dataFeedRes = await fetch(dataFeed, { cache: "no-store" });
  const dataFeedJson = await dataFeedRes.json();

  const controller: Controller | undefined = dataFeedJson.controllers.find(
    (member: OnlineMember) => String(member.cid) === cid
  );

  if (controller !== undefined) {
    // Online as a controller or observer
    return {
      callsign: controller.callsign,
      role: controller.facility !== 0 ? "controller" : "observer",
      roleData:
        controller.facility !== 0 ? controller.frequency : "Observing...",
    };
  }

  const pilot: Pilot | undefined = dataFeedJson.pilots.find(
    (member: OnlineMember) => String(member.cid) === cid
  );

  if (pilot !== undefined) {
    // Online as a pilot
    return {
      callsign: pilot.callsign,
      role: "pilot",
      roleData: `${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`,
    };
  }

  // Offline
  return { callsign: null, role: null, roleData: null };
}

// Cache the extracted status per CID for 60s. unstable_cache keys on the
// arguments, so each CID gets its own entry; the cached value is tiny.
const getCachedOnlineStatus = unstable_cache(
  fetchOnlineStatus,
  ["vatsim-online"],
  { revalidate: 60 }
);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cid: string }> }
) {
  const { cid } = await params;

  try {
    const status = await getCachedOnlineStatus(cid);
    return NextResponse.json(status);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        callsign: null,
        role: null,
        roleData: null,
      },
      { status: 500 }
    );
  }
}
