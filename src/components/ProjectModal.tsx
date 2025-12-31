import { useEffect, useRef, useState } from "react";
import { techIcons } from "../constants/techIcons";

type RepoLink = {
  label: string;
  url: string;
};

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
  github: RepoLink[];
  Images?: string[];
  video?: string;
  demo?: string;
};

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isGuideShown, setIsGuideShown] = useState(false);

  useEffect(() => {
    const el = contentRef.current;

    if (el && el.scrollHeight > el.clientHeight) {
      setIsScrollable(true);
      setIsGuideShown(true); // 처음에만 보여줌
    }

    const handleScroll = () => {
      if (el && el.scrollTop > 0) {
        setIsGuideShown(false); // 스크롤 시작하면 사라짐
      }
    };

    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [project]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-md backdrop-brightness-75 transition-all duration-300 flex justify-center items-center z-50"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="sticky top-0 ml-auto text-2xl hover:bg-black/10 rounded-full w-8 h-8 flex items-center justify-center dark:text-white"
        >
          ×
        </button>

        {/* 2단 레이아웃 시작 */}
        <div className="md:flex gap-6">
          {/* 왼쪽 내용 */}
          <div className="md:w-2/3">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={`${import.meta.env.BASE_URL}${project.logo}`}
                alt={`${project.title} logo`}
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {project.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {project.period} | {project.team}
            </p>
            <p className="mt-4 text-lg text-gray-800 dark:text-white">
              {project.summary}
            </p>

            {(project.github.length > 0 || project.demo) && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  🔗 Links
                </h3>

                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {project.github.map((link) => (
                    <li
                      key={link.url}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}

                  {project.demo && (
                    <li className="text-gray-600 dark:text-gray-300">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Live Demo
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <Section title="✨ Features" items={project.features} />

            {/* 기술 스택 */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                🛠️ Technologies Used
              </h3>
              <div className="flex flex-wrap gap-5 mt-2">
                {project.stack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <img
                      src={`${import.meta.env.BASE_URL}${
                        techIcons[tech] || "icons/default.png"
                      }`}
                      alt={tech}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-gray-700 dark:text-gray-200 text-sm">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {project.contribution && (
              <Section
                title="🚀 My Contribution"
                items={project.contribution}
              />
            )}
            {project.problemSolving && (
              <Section
                title="🔍 Problem Solving"
                items={project.problemSolving}
              />
            )}
            {project.learning && (
              <Section title="💡 What I Learned" items={project.learning} />
            )}
          </div>

          {/* 오른쪽 이미지/비디오 */}
          {project.Images && project.Images.length > 0 && (
            <div className="md:w-1/3 mt-6 md:mt-0">
              <div className="grid grid-cols-1 gap-4 mt-4">
                {project.Images.map((img, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.BASE_URL}${img}`}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                ))}
                {project.video && (
                  <video
                    controls
                    className="w-full h-auto rounded-lg"
                    src={`${import.meta.env.BASE_URL}${project.video}`}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {/* 2단 레이아웃 끝 */}

        {/* 스크롤 안내 아이콘 (스크롤 가능한 경우, 아직 한 번도 안 스크롤했을 때만) */}
        {isScrollable && isGuideShown && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400 text-sm">
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded-full text-sm shadow-md">
              ↓ Scroll for more
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
      {title}
    </h3>
    <ul className="list-disc pl-5 mt-2 space-y-1">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-gray-600 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </ul>
  </div>
);

export default ProjectModal;
