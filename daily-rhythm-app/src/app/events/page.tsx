import React from 'react';
import { Calendar } from '@/components/ui/calendar';

const Events = () => {
  return (
    <div className="flex justify-center items-center h-full bg-brand-background p-4 w-1/2">
      <div className="w-full rounded-lg shadow-lg h-full">
        <Calendar 
          mode='single'
          selected={new Date()}
          className='w-full h-full rounded-md border'
        />
      </div>
    </div>
  );
};

export default Events;
