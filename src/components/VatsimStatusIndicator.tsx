"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

interface VatsimStatus {
  callsign: string | null;
  role: string | null;
  roleData: string | null;
}

function determineEmoji(role: string | null) {
  switch (role) {
    case "controller":
      return "📡";
    case "pilot":
      return "✈️";
    default:
      return "👀";
  }
}

// vatsim-radar can locate pilots by CID and active controllers by callsign,
// but has no useful view for observers — so they get no link.
function buildRadarUrl(
  role: string | null,
  callsign: string | null,
  cid: number,
): string | null {
  if (role === "pilot") return `https://vatsim-radar.com/?pilot=${cid}`;
  if (role === "controller" && callsign)
    return `https://vatsim-radar.com/?atc=${encodeURIComponent(callsign)}`;
  return null;
}

export const VatsimStatusIndicator = () => {
  const cid = 1186831;
  const { data, isLoading } = useSWR<VatsimStatus>(
    `/api/vatsim/online/${cid}`,
    fetcher,
  );

  const isOnline = data?.callsign != null;
  const radarUrl = isOnline
    ? buildRadarUrl(data.role, data.callsign, cid)
    : null;

  const statusBody = data && (
    <>
      <div className="text-sm font-semibold text-gray-700 dark:text-white">
        {data.callsign}
      </div>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {data.roleData} <span aria-hidden>{determineEmoji(data.role)}</span>
      </div>
    </>
  );

  return (
    <div className="flex justify-around px-3 py-2 space-x-1 bg-gray-200 rounded-md cursor-default dark:bg-gray-800">
      <div
        className={`self-center w-3 h-3 rounded-full ${
          isLoading || !data
            ? "bg-gray-400"
            : isOnline
              ? "bg-green-500"
              : "bg-red-500"
        }`}
      ></div>
      <div>
        {isLoading || !data ? (
          <div className="text-sm font-semibold text-gray-700 dark:text-white">
            Loading{" "}
            <span className="font-medium" aria-hidden>
              ⏳
            </span>
          </div>
        ) : isOnline ? (
          radarUrl ? (
            <a
              href={radarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center hover:underline"
            >
              {statusBody}
            </a>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {statusBody}
            </div>
          )
        ) : (
          <div className="text-sm font-semibold text-gray-700 dark:text-white">
            Offline{" "}
            <span className="font-medium" aria-hidden>
              😴
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
