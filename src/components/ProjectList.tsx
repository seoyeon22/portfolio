import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectModal from './ProjectModal';

type Project = {
  logo: string;
  title: string;
  period: string;
  team: string;
  stack: string[];
  summary: string;
  features: string[];
  contribution?: string[];
  problemSolving?: string[];
  learning?: string[];
  github: string;
  Images?: string[];
  video?: string;
  demo?: string;
};

const ProjectList = () => {
  const { t, i18n } = useTranslation('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = () => {
      const projectData = t('projects', { returnObjects: true }) as Project[];
      setProjects(projectData);
    };

    loadProjects();
  }, [i18n.language, t]);

  // 배열이 아니면 렌더링하지 않도록 조건 추가
  if (!Array.isArray(projects)) {
    return <div>Projects data is not available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.title}
          onClick={() => setSelectedProject(project)}
          className="cursor-pointer bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
        >
          <img src={`${import.meta.env.BASE_URL}${project.logo}`} alt={project.title} className="h-16 mb-3" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{project.summary}</p>
        </div>
      ))}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectList;
