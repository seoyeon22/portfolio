import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const location = useLocation(); // useLocation을 사용하여 현재 경로를 추적

  const isHome = location.pathname === "/";

  useEffect(() => {
    // 경로 이동 시 메뉴 닫기
    setIsMenuOpen(false);

    // 홈 페이지가 아닐 때는 헤더를 항상 보이도록 설정
    if (!isHome) {
      setShowHeader(true);
      return;
    }

    // 홈 페이지에 들어올 때 스크롤값에 따라 헤더를 보여줄지 말지 설정
    setShowHeader(window.scrollY > 100);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, location.pathname]); // 경로가 바뀔 때마다 상태를 재설정

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // 햄버거 닫기
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header
      className={`${isHome ? "fixed" : "relative"} 
        top-0 left-0 right-0 z-20 p-3 
        bg-white dark:bg-gray-800 shadow-md 
        transition-transform duration-500 ease-in-out 
        ${isHome ? (showHeader ? "translate-y-0" : "-translate-y-full") : ""}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link to="/">Seoyeon.dev</Link>
        </h1>

        {/* 햄버거 메뉴 아이콘 */}
        <div
          className={`hamburger-menu ${
            isMenuOpen ? "open fixed top-0 right-0 z-20 p-3" : "relative"
          } `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="line line-1 bg-gray-800 dark:bg-white"></div>
          <div className="line line-2 bg-gray-800 dark:bg-white"></div>
          <div className="line line-3 bg-gray-800 dark:bg-white"></div>
        </div>
      </div>

      {/* 햄버거 메뉴가 열렸을 때 보이는 설정 */}
      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 h-screen min-w-[200px] bg-white shadow-lg dark:bg-gray-800 p-6 transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-10">
            <button
              onClick={() => scrollToSection("about-section")}
              className="text-gray-800 dark:text-white text-left hover:text-blue-500"
            >
              {i18n.language === "ko" ? "소개" : "About"}
            </button>
            <button
              onClick={() => scrollToSection("projects-section")}
              className="text-gray-800 dark:text-white text-left hover:text-blue-500"
            >
              {i18n.language === "ko" ? "프로젝트" : "Projects"}
            </button>
            <hr className="border-gray-300" />
            {/* 다크모드 토글 */}
            <div className="flex items-center justify-between">
              <span className="text-gray-800 dark:text-white">
                {i18n.language === "ko" ? "다크모드" : "Dark Mode"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600" />
              </label>
            </div>
            {/* 언어 토글 */}
            <div className="flex items-center justify-between">
              <span className="text-gray-800 dark:text-white">
                {i18n.language === "ko" ? "English" : "한국어"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={i18n.language === "en"}
                  onChange={() =>
                    changeLanguage(i18n.language === "ko" ? "en" : "ko")
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 peer-checked:bg-blue-600 rounded-full peer relative" />
                <div className="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full dark:border-gray-600" />
              </label>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
