"use client";

import { useEffect, useState } from "react";
import {
  Folder,
  FolderPlus,
  Plus,
  Trash2,
} from "lucide-react";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

type FolderItem = {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
};

const PROJECTS_KEY = "ai-chat-vault:projects:v1";
const FOLDERS_KEY = "ai-chat-vault:folders:v1";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [projectName, setProjectName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_KEY);
    const savedFolders = localStorage.getItem(FOLDERS_KEY);

    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects) as Project[];
      setProjects(parsedProjects);
      setSelectedProjectId(parsedProjects[0]?.id ?? "");
    }

    if (savedFolders) {
      setFolders(JSON.parse(savedFolders) as FolderItem[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  }, [folders]);

  function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = projectName.trim();

    if (!name) {
      return;
    }

    const project: Project = {
      id: crypto.randomUUID(),
      name,
      description: "Project workspace",
      createdAt: new Date().toISOString(),
    };

    const generalFolder: FolderItem = {
      id: crypto.randomUUID(),
      projectId: project.id,
      name: "General",
      createdAt: new Date().toISOString(),
    };

    setProjects((current) => [...current, project]);
    setFolders((current) => [...current, generalFolder]);
    setSelectedProjectId(project.id);
    setProjectName("");
  }

  function createFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = folderName.trim();

    if (!name || !selectedProjectId) {
      return;
    }

    const folder: FolderItem = {
      id: crypto.randomUUID(),
      projectId: selectedProjectId,
      name,
      createdAt: new Date().toISOString(),
    };

    setFolders((current) => [...current, folder]);
    setFolderName("");
  }

  function deleteProject(projectId: string) {
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );

    setFolders((current) =>
      current.filter((folder) => folder.projectId !== projectId),
    );

    if (selectedProjectId === projectId) {
      setSelectedProjectId("");
    }
  }

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  );

  const selectedFolders = folders.filter(
    (folder) => folder.projectId === selectedProjectId,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
        <p className="mt-1 text-sm text-slate-500">
          Organize conversations, files, decisions, and project memory.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">Create project</h2>

          <form onSubmit={createProject} className="mt-4 space-y-3">
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Project name"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <Plus className="h-4 w-4" />
              Create project
            </button>
          </form>

          <div className="mt-6 space-y-2">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectId(project.id)}
                className={[
                  "flex w-full items-center justify-between rounded-xl p-3 text-left text-sm",
                  selectedProjectId === project.id
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-slate-50",
                ].join(" ")}
              >
                <span className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  {project.name}
                </span>

                <Trash2
                  className="h-4 w-4 text-slate-400 hover:text-red-500"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteProject(project.id);
                  }}
                />
              </button>
            ))}

            {projects.length === 0 && (
              <p className="text-sm text-slate-400">
                No projects yet. Create your first project.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {selectedProject ? (
            <>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedProject.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedProject.description}
                  </p>
                </div>

                <form
                  onSubmit={createFolder}
                  className="flex gap-2"
                >
                  <input
                    value={folderName}
                    onChange={(event) => setFolderName(event.target.value)}
                    placeholder="New folder"
                    className="w-36 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <FolderPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </form>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {selectedFolders.map((folder) => (
                  <div
                    key={folder.id}
                    className="rounded-xl border border-slate-200 p-4 hover:border-blue-300"
                  >
                    <Folder className="h-5 w-5 text-blue-600" />
                    <h3 className="mt-3 font-medium text-slate-900">
                      {folder.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Ready for conversations
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <Folder className="mx-auto h-10 w-10 text-slate-300" />
              <h2 className="mt-4 font-semibold text-slate-900">
                Select or create a project
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your project folders will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
