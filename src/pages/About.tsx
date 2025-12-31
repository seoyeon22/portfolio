import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Experience = { [key: string]: { date: string; content: string } };
type Awards = { [key: string]: { date: string; content: string } };

const About = () => {
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState<'experience' | 'awards'>('experience');

  const experience = t('experience', { returnObjects: true }) as Experience;
  const awards = t('awards&certificates', { returnObjects: true }) as Awards;

  return (
    <div className="mx-auto">
      <h3 className="text-3xl font-semibold mb-4 text-white text-center">About Me</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((num) => (
          <div key={num} className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {t(`home.introduce${num}.title`)}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t(`home.introduce${num}.content`)}
            </p>
          </div>
        ))}
      </div>

      {/* Section Selector */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onMouseEnter={() => setActiveSection('experience')}
          className={`px-4 py-2 rounded-full transition ${activeSection === 'experience'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
          Experiences
        </button>
        <button
          onMouseEnter={() => setActiveSection('awards')}
          className={`px-4 py-2 rounded-full transition ${activeSection === 'awards'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
          Awards & Certificates
        </button>
      </div>

      {/* Experiences */}
      {activeSection === 'experience' && (
        <section>
          <ul className="timeline-ul">
            {Object.keys(experience).map((key) => (
              <li key={key} style={{ '--accent-color': '#1F2937' } as React.CSSProperties}>
                <div className="date">{experience[key].date}</div>
                <div className="descr whitespace-pre-line bg-white/90 text-center">{experience[key].content}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {activeSection === 'awards' && (
        <section>
          <ul className="timeline-ul">
            {Object.keys(awards).map((key) => (
              <li key={key} style={{ '--accent-color': '#1F2937' } as React.CSSProperties}>
                <div className="date">{awards[key].date}</div>
                <div className="descr whitespace-pre-line bg-white/90 text-center">{awards[key].content}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
};

export default About;
