export interface OrganizerStat {
  label: string;
  value: string;
  change: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface VendorRequest {
  id: string;
  vendor: string;
  event: string;
  status: string;
}

export const getOrganizerStats = (): OrganizerStat[] => [
  { label: 'Total Revenue', value: '$124,500', change: '+12.5%' },
  { label: 'Active Events', value: '8', change: '+2' },
  { label: 'Total Attendees', value: '4,200', change: '+18%' },
  { label: 'Vendor Contracts', value: '14', change: 'Pending: 3' }
];

export const getTeamMembers = (): TeamMember[] => [
  { id: 1, name: 'Alice Walker', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol Davis', role: 'Viewer', status: 'Inactive' }
];

export const getVendorPipeline = (): VendorRequest[] => [
  { id: 'v1', vendor: 'Lumina Catering', event: 'Tech Summit 2026', status: 'Negotiating' },
  { id: 'v2', vendor: 'SoundWave Pros', event: 'Tech Summit 2026', status: 'Contract Sent' },
  { id: 'v3', vendor: 'Elite Security', event: 'Gala Night', status: 'Reviewing' }
];
