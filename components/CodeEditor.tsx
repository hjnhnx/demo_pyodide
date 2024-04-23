"use client"
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("python");

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language: any) => {
        setLanguage(language);
        // @ts-ignore
        setValue(CODE_SNIPPETS[language]);
    };

    return (
        <div>

            <div className="w-[100%]">
                <LanguageSelector language={language} onSelect={onSelect} />
                <Editor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                    }}
                    height="40vh"
                    theme="vs-dark"
                    language={language}
                    // @ts-ignore
                    defaultValue={CODE_SNIPPETS[language]}
                    onMount={onMount}
                    value={value}
                    // @ts-ignore
                    onChange={(value) => setValue(value)}
                />
            </div>
            <div className="w-[100%]">
                <Output editorRef={editorRef} language={language} />
            </div>
        </div>
    );
};
export default CodeEditor;
