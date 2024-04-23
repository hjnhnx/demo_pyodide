import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }: { language: any, onSelect: any }) => {
    const choiceLang = (e: any) => {
        onSelect(e.target.value)
    }


    return (
        <div className="ml-2 mb-4">
            Language:
            <select className="bg-red-500 h-10 px-3 rounded ml-3" color="black" onChange={choiceLang}>
                {languages.map(([lang, version]) => (
                    <option key={lang} className={lang === language ? "bg-gray-400" : "bg-gray-700"} value={lang}>{lang} &nbsp; {version}</option>
                ))}

            </select>
        </div>
    );
};
export default LanguageSelector;
