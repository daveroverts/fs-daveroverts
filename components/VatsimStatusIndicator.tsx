import useSWR from "swr";
import fetcher from "lib/fetcher";

export const VatsimStatusIndicator = () => {
    const cid = 1186831;
    const { data } = useSWR(`/api/vatsim/online/${cid}`, fetcher);

    return (
        <div className="flex justify-around px-3 py-2 space-x-1 bg-gray-200 rounded-md cursor-default dark:bg-gray-800">
            <div className={`self-center w-3 h-3 rounded-full ${data?.callsign ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div className="">{data?.callsign ? data.callsign : 'Offline'} {data?.depArr ? `| ${data?.depArr}` : null}</div>
        </div>
    )
}