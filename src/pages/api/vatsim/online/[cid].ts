import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  callsign: string | null;
  role: string | null;
  roleData: string | null;
  error?: string;
};
interface OnlineMember {
  cid: string;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    res.status(405).setHeader("Allow", "GET").end("Method Not Allowed");
    return;
  }
  const { cid } = req.query;

  try {
    const statusRes = await axios("https://status.vatsim.net/status.json");
    const dataFeeds = statusRes.data.data.v3;
    const dataFeed = dataFeeds[Math.floor(Math.random() * dataFeeds.length)];

    const dataFeedRes = await axios(dataFeed);

    const controller: Controller | undefined =
      dataFeedRes.data.controllers.find(
        (data: OnlineMember) => data.cid == cid
      );

    if (controller !== undefined) {
      // Online as a controller or observer
      res.status(200).json({
        callsign: controller.callsign,
        role: controller.facility !== 0 ? "controller" : "observer",
        roleData:
          controller.facility !== 0 ? controller.frequency : "Observing...",
      });
    }

    const pilot: Pilot | undefined = dataFeedRes.data.pilots.find(
      (data: OnlineMember) => data.cid == cid
    );

    if (pilot !== undefined) {
      // Online as a pilot
      res.status(200).json({
        callsign: pilot.callsign,
        role: "pilot",
        roleData: `${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`,
      });
    }

    res.status(200).json({
      // Offline
      callsign: null,
      role: null,
      roleData: null,
    });

    return;
  } catch (error) {
    console.log(error);
  }

  res.status(500).send({
    error: "Failed to fetch data",
    callsign: null,
    role: null,
    roleData: null,
  });
}
