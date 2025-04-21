import useSWR from "swr";
import fetcher from "lib/fetcher";
import Emoji from "a11y-react-emoji";

export const VatsimStatusIndicator = () => {
  const cid = 1186831;
  const { data } = useSWR(`/api/vatsim/online/${cid}`, fetcher);

  const isOnline = data?.callsign !== null;
  const callsign = data?.callsign ?? null;
  const role = data?.role ?? null;
  const roleData = data?.roleData ?? null;

  function determineEmoji(role: string) {
    switch (role) {
      case "controller":
        return "📡";
      case "pilot":
        return "✈️";
      default:
        return "👀";
    }
  }

  return (
    <div className="flex justify-around px-3 py-2 space-x-1 bg-gray-200 rounded-md cursor-default dark:bg-gray-800">
      <div
        className={`self-center w-3 h-3 rounded-full ${
          data?.callsign ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <div>
        {isOnline ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-sm font-semibold text-gray-700 dark:text-white">
              {callsign}
            </div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {roleData} <Emoji symbol={determineEmoji(role)} />
            </div>
          </div>
        ) : (
          <div className="text-sm font-semibold text-gray-700 dark:text-white">
            Offline <Emoji className="font-medium" symbol="😴" />
          </div>
        )}
      </div>
    </div>
  );
};
