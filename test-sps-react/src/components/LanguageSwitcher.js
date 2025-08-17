import React from "react";
import { useI18n } from "../contexts/I18nContext";

function LanguageSwitcher() {
  const { language, changeLanguage, t } = useI18n();

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Português" },
    { code: "es", name: "Espanol" },
  ];

  const selectStyle = {
    padding: "0.25rem 0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "0.875rem",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <label htmlFor="language-select" style={{ fontSize: "0.875rem" }}>
        {t("general.language")}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        style={selectStyle}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
