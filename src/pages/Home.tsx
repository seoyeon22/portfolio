import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typewriter } from 'react-simple-typewriter';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';

const Home = () => {
  const { t, i18n } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);
  const [typeText, setTypeText] = useState(t('home.type'));
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTypeText(t('home.type'));
  }, [i18n.language, t]);

  return (
    <div className="relative h-auto overflow-x-hidden">
      {/* 배경 이미지 영역 (스크린 크기 고정) */}
      <div className="relative h-screen">
        <div
          className={`fixed inset-0 bg-cover bg-center transition-all duration-700 ${scrolled ? 'brightness-50 backdrop-blur-sm' : 'brightness-100'
            }`}
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/background.png)` }}
        />

        {/* 프로필 이미지 (로딩 상태 관리 + 배경 + 전환 효과) */}
        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] w-auto h-[40vh] max-h-[60vh]">
          <img
            src={`${import.meta.env.BASE_URL}images/profile-image.png`}
            alt="person"
            className={`object-contain h-full transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          )}
        </div>

        {/* 타이핑 텍스트 */}
        <div
          className={`fixed left-0 right-0 transition-all duration-600 z-10 ${scrolled ? 'top-4 opacity-0' : 'top-1/2 -translate-y-1/2 opacity-100'
            } font-bold text-white text-opacity-90 text-center leading-[4rem] whitespace-normal break-keep`}
          style={{
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            lineHeight: 'clamp(2.5rem, 10vw, 6rem)',
            textShadow: '6px 6px 12px rgba(0, 0, 0, 0.85)',
            padding: '0 10%',
          }}
        >
          <Typewriter
            words={[typeText]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={0}
          />
        </div>

        {/* 스크롤 유도 화살표 */}
        {!scrolled && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-white text-opacity-70 text-4xl">
            ↓
          </div>
        )}
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="relative -mt-[100vh] pt-[100vh] p-8">
        {/* 소개 */}
        <section>
          <hr className="border-white" />
          <div className="pt-5" id="about-section">
            <About />
          </div>
          <hr className='mt-10 border-white'/>
          <div className="pt-5" id="skills-section">
            <Skills />
          </div>
          <hr className="mt-10 border-white" />
          <div className="pt-5" id="projects-section">
            <Projects />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
