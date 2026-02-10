"use client";

import React, { useState } from 'react';
import { Plus, X, Folder, Trash2 } from 'lucide-react';

const Card = ({ 
  name, 
  isTrigger, 
  onClick, 
  onDelete 
}: { 
  name?: string; 
  isTrigger?: boolean; 
  onClick: () => void;
  onDelete?: () => void;
}) => {
  const baseStyles = "relative h-64 w-full rounded-2xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6";
  
  if (isTrigger) {
    return (
      <button 
        onClick={onClick}
        className={`${baseStyles} border-2 border-dashed border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50 group`}
      >
        <div className="p-4 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
          <Plus className="w-8 h-8 text-slate-500 group-hover:text-blue-600" />
        </div>
        <span className="mt-4 font-semibold text-slate-500 group-hover:text-blue-600">Add New Project</span>
      </button>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`${baseStyles} bg-white border border-slate-200 shadow-sm hover:shadow-md items-start justify-end group`}
    >
      {/* Delete Button (Top Right) */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevents card click trigger
          onDelete?.();
        }}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <X size={18} />
      </button>

      <div className="absolute top-6 left-6 p-3 bg-blue-600 rounded-xl text-white">
        <Folder size={20} />
      </div>
      
      <div className="w-full">
        <h3 className="text-lg font-bold text-slate-800 truncate">{name}</h3>
        <p className="text-sm text-slate-500">Project Workspace</p>
      </div>
    </div>
  );
};

export default Card;