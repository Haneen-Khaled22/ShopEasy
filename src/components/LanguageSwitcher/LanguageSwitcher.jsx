import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  return (
    <div className="flex items-center border border-[#c8b49a] rounded-full overflow-hidden text-sm">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`px-3 py-1 transition ${
          currentLang === "en"
            ? "bg-[#5c3d1e] text-white"
            : "bg-transparent text-[#5c3d1e]"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => i18n.changeLanguage("ar")}
        className={`px-3 py-1 transition ${
          currentLang === "ar"
            ? "bg-[#5c3d1e] text-white"
            : "bg-transparent text-[#5c3d1e]"
        }`}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSwitcher;