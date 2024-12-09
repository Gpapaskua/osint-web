import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScanDialog = ({ open, onOpenChange }: Props) => {
  const [searchParams, setSearParams] = useSearchParams();
  const domain = searchParams.get("domain") ?? "";
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    setSearParams({ domain: inputRef.current.value });
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          Initiate Scan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Initiate scan</DialogTitle>
          <DialogDescription>
            Fill in domain name to start scan
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-8">
            <div>
              <Input
                type="search"
                placeholder="example.com"
                defaultValue={domain}
                ref={inputRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Scan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScanDialog;
