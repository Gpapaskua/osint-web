import useScanByIdQuery from "@/queries/useScans/useScanByIdQuery";
import { Link, useParams } from "react-router-dom";

const Scan = () => {
  const { scanId = "" } = useParams();
  const { data, error } = useScanByIdQuery(scanId);

  if (error)
    return (
      <div className="h-[100vh] flex items-center justify-center text-xl text-red-">
        {error.message || "Something went wrong"}
      </div>
    );

  if (!data)
    return (
      <div className="text-center py-10 text-gray-500">No data available.</div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          &larr; Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">{data.domain}</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">Start Time:</p>
          <p>{new Date(data.startTime).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">End Time:</p>
          <p>{new Date(data.endTime).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{data.status}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Scan Results</h2>
      {data.results.length > 0 ? (
        <ul className="space-y-4">
          {data.results.map((result) => (
            <li
              key={result.subdomain}
              className="border border-gray-300 rounded-lg p-4 bg-white"
            >
              <p className="font-semibold">Subdomain:</p>
              <p>{result.subdomain}</p>
              <p className="font-semibold mt-2">IP Address:</p>
              <p>{result.ipAddress}</p>
              <p className="font-semibold mt-2">Discovered At:</p>
              <p>{new Date(result.discoveredAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found for this scan.</p>
      )}
    </div>
  );
};

export default Scan;
