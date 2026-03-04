import React from 'react';

const SkeletonCard = () => (
    <div className="relative h-64 w-full rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col items-start justify-end animate-pulse">
        <div className="absolute top-6 left-6 w-11 h-11 bg-slate-200 rounded-xl" />
        <div className="w-full mt-auto space-y-3">
            <div className="h-6 bg-slate-200 rounded-md w-3/4" />
            <div className="h-4 bg-slate-200 rounded-md w-1/2" />
        </div>
    </div>
);

export default SkeletonCard;
