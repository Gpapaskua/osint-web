import ScanCard from "@/components/ScanCard";
import ScanDialog from "@/components/ScanDialog";
import ScanResultsModal from "@/components/ScanResultsModal";
import useScansQuery from "@/queries/useScans/useScansQuery";
import { ScanData, Subdomain } from "@/types";
import { setLocalStorageItem } from "@/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [detailedResults, setDetailedResults] = useState<Subdomain[] | null>(
    null
  );
  const [searchParams] = useSearchParams();

  const domain = searchParams.get("domain") ?? "";

  const client = useQueryClient();
  const { data: { scans = [] } = {} } = useScansQuery(domain);

  const handleScanReorder = (e: DragEndEvent) => {
    if (!e.over) return;

    if (e.active.id !== e.over.id) {
      client.setQueryData(
        ["useScansQuery", domain],
        (data: ScanData | undefined) => {
          const { scans: prevScans } = data || {};
          if (!prevScans) return undefined;

          const oldIdx = prevScans.findIndex((sc) => sc.id === e.active.id);
          const newIdx = prevScans.findIndex((sc) => sc.id === e.over!.id);
          const newScans = arrayMove(scans, oldIdx, newIdx);
          const savedOrder = newScans.map((scan) => scan.id);
          setLocalStorageItem("scanOrder", savedOrder);
          return { scans: newScans };
        }
      );
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-center p-8">
          <ScanDialog open={open} onOpenChange={setOpen} />
        </div>
        <div>
          {scans.length ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-gray-700">
                Scan Results
              </h1>
              <DndContext onDragEnd={handleScanReorder}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <SortableContext items={scans}>
                    {scans.map((scan) => (
                      <ScanCard
                        scanDetails={scan}
                        key={scan.id}
                        onShowResults={(res) => setDetailedResults(res)}
                      />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </>
          ) : (
            <div className="flex justify-center mt-8 text-xl">
              Initiate new scan to see some results
            </div>
          )}
        </div>
      </div>
      <ScanResultsModal
        open={!!detailedResults}
        results={detailedResults}
        onOpenChange={() => setDetailedResults(null)}
      />
    </>
  );
};

export default HomePage;
