import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import ActivityCreate from '@/components/layout/ActivityCreate/page';
import ActivityElements from '@/components/layout/ActivityElements/page';

const Activities = () => {
  return (
    <div className="h-full flex items-center justify-between p-3">
      <ActivityCreate />
      <ActivityElements />
    </div>
  );
};

export default Activities;
