import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ScanResult, Subdomain } from "@/types";

interface Props {
  scanDetails: ScanResult;
  onShowResults: (res: Subdomain[]) => void;
}

const customTransition = {
  duration: 200,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
};

const ScanCard = ({ scanDetails, onShowResults }: Props) => {
  const { domain, startTime, endTime, status, results, id } = scanDetails;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges: () => false,
      transition: customTransition,
    });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
    >
      <CardHeader>
        <CardTitle>{domain}</CardTitle>
        <CardDescription>Scan details</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Start Time: {new Date(startTime).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          End Time: {new Date(endTime).toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <p className="text-sm text-gray-600">Status: {status}</p>
        {results.length > 0 ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onShowResults(results);
            }}
            variant="secondary"
            className="bg-gray-700 text-white hover:text-gray-950"
          >
            View Subdomains
          </Button>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No results found</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ScanCard;
