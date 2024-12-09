import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Subdomain } from "@/types";

interface Props {
  open: boolean;
  results: Subdomain[] | null;
  onOpenChange: (open: boolean) => void;
}

const ScanResultsModal = ({ onOpenChange, open, results }: Props) => {
  if (!results) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subdomain results</DialogTitle>
          <ul className="space-y-2 py-4">
            {results.map((result, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded border border-gray-200 text-sm text-gray-700"
              >
                <strong>Subdomain:</strong> {result.subdomain} <br />
                <strong>IP:</strong> {result.ipAddress}
              </li>
            ))}
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ScanResultsModal;
