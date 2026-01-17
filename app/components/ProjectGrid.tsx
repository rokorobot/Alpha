'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Project {
    _id: string;
    title: string;
    category: string;
    status: string;
    mainImage: string;
    projectVideo?: string;
}

interface ProjectGridProps {
    projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <>
            <div className="container projects-grid">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div
                            key={project._id}
                            className="project-card"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="card-header">
                                <span>FILE_0{index + 1}</span>
                                <span>[{project.status || "UNKNOWN"}]</span>
                            </div>
                            <div className="card-image h-[400px]">
                                {project.projectVideo ? (
                                    <video
                                        src={project.projectVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                ) : project.mainImage && (
                                    <Image
                                        src={project.mainImage}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: "cover", opacity: 0.8 }}
                                    />
                                )}
                                <div className="crosshair"></div>
                            </div>
                            <div className="card-footer">
                                <h3>{project.title}</h3>
                                <p>{project.category}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="project-card">
                        <div className="card-header">
                            <span>SYSTEM_MSG</span>
                            <span>[EMPTY]</span>
                        </div>
                        <div className="card-image h-[400px]">
                            <div className="crosshair"></div>
                        </div>
                        <div className="card-footer">
                            <h3>NO_DATA_FOUND</h3>
                            <p>PLEASE INITIALIZE DATABASE</p>
                        </div>
                    </div>
                )}
            </div>

            {/* FULL SCREEN MODAL */}
            {selectedProject && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedProject(null)}>
                    <div className="relative w-full max-w-6xl border border-[#d0e0c0] bg-[#0b1210] p-1" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute z-50 top-2 right-2 bg-black/50 hover:bg-red-900/50 text-[#d0e0c0] hover:text-red-400 border border-[#d0e0c0] px-4 py-2 font-mono text-xl transition-colors"
                            onClick={() => setSelectedProject(null)}
                        >
                            [X] CLOSE
                        </button>

                        <div className="relative aspect-video w-full bg-black">
                            {selectedProject.projectVideo ? (
                                <video
                                    src={selectedProject.projectVideo}
                                    autoPlay
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedProject.mainImage}
                                        alt={selectedProject.title}
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                            )}

                            {/* Decorative Overlays */}
                            <div className="absolute top-4 left-4 text-[#d0e0c0] font-mono text-sm pointer-events-none">
                                REC :: {selectedProject.title}
                            </div>
                            <div className="absolute bottom-4 right-4 text-[#d0e0c0] font-mono text-sm pointer-events-none animate-pulse">
                                AUDIO_ON
                            </div>
                        </div>

                        <div className="p-4 border-t border-[#d0e0c0]/30 flex justify-between items-end font-mono">
                            <div>
                                <h2 className="text-2xl text-[#d0e0c0]">{selectedProject.title}</h2>
                                <div className="text-[#a4cfa4] text-sm">{selectedProject.category}</div>
                            </div>
                            <div className="text-xs text-[#4a5a4a]">
                                STATUS: {selectedProject.status}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
