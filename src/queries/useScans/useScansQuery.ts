import { useQuery } from "@tanstack/react-query";
import mockScanData from "@/mocks/scanData.json";
import { ScanData } from "@/types";
import { getLocalStorageItem } from "@/utils";

const useScansQuery = (domain: string) =>
  useQuery<ScanData>({
    queryKey: ["useScansQuery", domain],
    queryFn: () => ({ scans: mockScanData }),
    enabled: !!domain,
    select: ({ scans }) => {
      const savedOrder = getLocalStorageItem<number[]>("scanOrder");
      if (savedOrder) {
        scans.sort(
          (a, b) => savedOrder.indexOf(a.id) - savedOrder.indexOf(b.id)
        );
      }
      return { scans };
    },
  });

export default useScansQuery;
