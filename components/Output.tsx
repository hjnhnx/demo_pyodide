import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }: { editorRef: any, language: any }) => {
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(language, sourceCode);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error: any) {
            console.log(error);
            alert(error.message || "Unable to run code")
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[100%] relative">
            <button
                className="bg-red-500 h-10 px-3 rounded ml-3 absolute top-[-50px] right-2"
                onClick={runCode}
            >
                Run Code
            </button>
            <br />
            <div
                className={"h-[40vh] p-2 border rounded overflow-scroll"}
            >
                {output
                    // @ts-ignore   
                    ? output.map((line, i) => <p key={i}>{line}</p>)
                    : 'Click "Run Code" to see the output here'}
            </div>
        </div>
    );
};
export default Output;
