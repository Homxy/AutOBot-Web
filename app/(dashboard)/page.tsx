"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{id: number, name: string} | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/code');
    }
    else {
      fetchWorkspaces();
      console.log(projects)
    }

  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await fetch('/api/workspace');
      const data = await res.json();
      console.log(data);  
      setProjects(data);
    } 
    catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    try {
      const res = await fetch('/api/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: projectName, 
          data: {}
        }),
      });

      if (res.ok) {
        fetchWorkspaces();
        setProjectName('');
        setIsModalOpen(false);
      }
      else if (res.status === 409) {
        alert("A workspace with this name already exists.");
      }
      
    } catch (error) {
      console.error("Creation failed", error);
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch(`/api/workspace/${projectToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== projectToDelete.id));
        setProjectToDelete(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 text-2xl font-semibold">
        WorkSpace
        <div>
          <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card isTrigger onClick={() => setIsModalOpen(true)} />

            {projects.map((project: any) => (
              <Card 
                key={project.id} 
                name={project.name} 
                onClick={() => router.push(`/${project.id}`)}
                onDelete={() => setProjectToDelete(project)} 
              />
            ))}
          </div>

          {/* CREATE MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
                <h2 className="text-xl font-bold text-slate-800 mb-6">New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input 
                    autoFocus
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter a name..."
                    className="text-xl font-semibold w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 text-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-3 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg">Create</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DELETE CONFIRMATION MODAL */}
          {projectToDelete && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setProjectToDelete(null)} />
              <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-200 text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <Trash2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Project?</h2>
                <p className="text-slate-500 mb-8">
                  Are you sure you want to delete <span className="font-semibold text-slate-800">"{projectToDelete.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setProjectToDelete(null)} 
                    className="flex-1 px-4 py-3 text-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 text-xl font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}