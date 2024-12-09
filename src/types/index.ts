export interface Subdomain {
  subdomain: string;
  ipAddress: string;
  discoveredAt: string;
}

export interface ScanResult {
  id: number;
  domain: string;
  startTime: string;
  endTime: string;
  status: string;
  results: Subdomain[];
}

export interface ScanData {
  scans: ScanResult[];
}
