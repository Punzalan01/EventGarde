import { useState, useMemo } from 'react';
import { getOrganizerStats, getTeamMembers, getVendorPipeline } from '../models/organizer.model';

export function useOrganizerDashboardViewModel() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = useMemo(() => getOrganizerStats(), []);
  const teamMembers = useMemo(() => getTeamMembers(), []);
  const vendorPipeline = useMemo(() => getVendorPipeline(), []);

  return {
    activeTab,
    setActiveTab,
    stats,
    teamMembers,
    vendorPipeline
  };
}
