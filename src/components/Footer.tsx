import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-grap-800 dark:text-white py-2 border-t border-gray-200 dark:border-none z-10">
      <div className="max-w-screen-xl mx-auto px-2 text-center space-y-1">
        <p className="text-sm text-gray-400">&copy; 2025 Seoyeon Hong. All rights reserved.</p>
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://github.com/seoyeon22"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/seoyeon-hong-1a4ba6235"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="mailto:hsy2709@gmail.com"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </a>
          <a
            href="https://velog.io/@seoyeon22/posts"
            className="flex items-center gap-1 hover:text-gray-300 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Velog</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
