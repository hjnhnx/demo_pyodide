import { useState, useEffect, useRef } from "react";
import { useScript } from "usehooks-ts";
const PYODIDE_VERSION = "0.25.0";

export default function usePythonRunner() {
    const [pyodide, setPyodide] = useState(null);
    const out = useRef("");
    const pyodideScriptStatus = useScript(
        `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`
    );
    const outputArea = document.getElementById("output-log");

    useEffect(() => {
        if (pyodideScriptStatus === "ready" && !pyodide) {
            (async () => {
                // @ts-ignore
                const loadedPyodide = await globalThis.loadPyodide({
                    indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
                    stdout: (s: any) => {
                        const paragraph = document.createElement("p");
                        paragraph.innerHTML = `>> ${s}`;
                        // @ts-ignore
                        outputArea.appendChild(paragraph);
                    },
                });
                setPyodide(loadedPyodide);
            })();
        }
    }, [pyodideScriptStatus, pyodide]);

    return { pyodide, out };
}   