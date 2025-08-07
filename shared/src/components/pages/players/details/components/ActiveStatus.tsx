import React from 'react';

const ActiveStatus = () => {
  return (
    <div className="w-4 h-4 flex items-center justify-center bg-surface-brandLight rounded-full">
      <div className="w-3 h-3 flex items-center justify-center bg-surface-brand/50 rounded-full">
        <div className="w-2 h-2 flex items-center justify-center bg-primary rounded-full" />
      </div>
    </div>
  );
};

export default ActiveStatus;
