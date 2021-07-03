import useSWR from "swr";
import fetcher from "lib/fetcher";

export const VatsimStatusIndicator = () => {
    const cid = 1186831;
    const { data } = useSWR(`/api/vatsim/online/${cid}`, fetcher);

    if (!data) {
      return null
    }

    return (
        <a className="px-3 py-2 bg-gray-100 rounded-md cursor-default">
            {data.callsign ? data.callsign : 'Offline'} {data.depArr ? `| ${data.depArr}` : null}
        </a>
    )
}