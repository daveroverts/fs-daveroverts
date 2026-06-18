import { NextResponse } from "next/server";
import axios from "axios";

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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cid: string }> }
) {
  const { cid } = await params;

  try {
    const statusRes = await axios("https://status.vatsim.net/status.json");
    const dataFeeds: string[] = statusRes.data.data.v3;
    const dataFeed = dataFeeds[Math.floor(Math.random() * dataFeeds.length)];

    const dataFeedRes = await axios(dataFeed);

    const controller: Controller | undefined =
      dataFeedRes.data.controllers.find(
        (member: OnlineMember) => String(member.cid) === cid
      );

    if (controller !== undefined) {
      // Online as a controller or observer
      return NextResponse.json({
        callsign: controller.callsign,
        role: controller.facility !== 0 ? "controller" : "observer",
        roleData:
          controller.facility !== 0 ? controller.frequency : "Observing...",
      });
    }

    const pilot: Pilot | undefined = dataFeedRes.data.pilots.find(
      (member: OnlineMember) => String(member.cid) === cid
    );

    if (pilot !== undefined) {
      // Online as a pilot
      return NextResponse.json({
        callsign: pilot.callsign,
        role: "pilot",
        roleData: `${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`,
      });
    }

    // Offline
    return NextResponse.json({
      callsign: null,
      role: null,
      roleData: null,
    });
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
