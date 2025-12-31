import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type SkillItem = {
  skill: string;
  logo: string;
  contents: string[];
};

type Skills = {
  [category: string]: {
    category: string;
    items: SkillItem[];
  };
};

const Skills = () => {
  const { t, i18n } = useTranslation("common");

  // t('skills') 결과를 메모이제이션
  const skills = useMemo(() => {
    return t("skills", { returnObjects: true }) as Skills;
  }, [i18n.language]);

  const allSkills: SkillItem[] = useMemo(
    () => Object.values(skills).flatMap((cat) => cat.items),
    [skills]
  );

  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // 언어가 바뀔 때 첫 번째 스킬로 초기화
  useEffect(() => {
    if (allSkills.length > 0) {
      setSelectedSkill(allSkills[0]);
    }
  }, [allSkills]);

  return (
    <div className="container mx-auto py-4">
      <h3 className="text-3xl font-semibold mb-4 text-white text-center">
        Skills
      </h3>

      {/* 아이콘 목록 */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-4 justify-center flex-wrap">
        {allSkills.map((item, index) => (
          <button
            key={index}
            onMouseEnter={() => setSelectedSkill(item)}
            onClick={() => setSelectedSkill(item)}
            className={`flex-shrink-0 w-14 h-14 rounded-full transition-all p-2
              ${
                selectedSkill?.skill === item.skill
                  ? "bg-white/80"
                  : "bg-white/20"
              }`}
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.logo}`}
              alt={item.skill}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* 상세 내용 카드 */}
      {selectedSkill && (
        <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {selectedSkill.skill}
          </h2>
          <ul className="space-y-2 pl-1">
            {selectedSkill.contents.map((content, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span>{content}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Skills;
