import { useQuery } from "@tanstack/react-query";
import mockScanData from "@/mocks/scanData.json";
import { ScanResult } from "@/types";

const useScanByIdQuery = (id: string) =>
  useQuery<ScanResult>({
    queryKey: ["useScansQuery", id],
    queryFn: () => {
      const data = mockScanData.find((sc) => sc.id === +id);
      if (!data) {
        console.log("here");
        throw new Error("Scan not found");
      }
      return data;
    },
    enabled: !!id,
  });

export default useScanByIdQuery;
