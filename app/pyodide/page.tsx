"use client"
import React, { useEffect } from "react";
import usePythonRunner from "@/PythonRunner/withPythonRunner";


export default function Home() {
    const [input, setInput] = React.useState('print("hello pyodide")')
    const [output, setOutput] = React.useState('')
    const { pyodide, out } = usePythonRunner();
    const outputArea = document.getElementById("output-log");

    const runPythonCode = async () => {
        // @ts-ignore
        outputArea.innerHTML = ""
        if (pyodide) {
            try {
                // @ts-ignore
                await pyodide.runPython(input);
            } catch (error) {
                console.error("Error running Python code:", error);
                if (error) {
                    setOutput(`>> Error running Python code`);
                }
            }
        }
    };

    const handleOnchang = (event: any) => {
        setInput(event.target.value)
    }

    useEffect(() => {
        if (pyodide) {
            runPythonCode();
        }
    }, [pyodide]);

    useEffect(() => {
        if (out.current) {
            setOutput(out.current);
        }
    }, [out.current]);

    return (
        <div className="bg-gray-900 text-white h-[100vh]">
            <h2 className="text-center">Python</h2>
            <div className="container w-full mx-auto max-w-lg">
                <textarea value={input} onChange={handleOnchang} id="python-source" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                <div id="output-log" className="h-96 overflow-auto mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></div>
            </div>
            <div className="max-w-lg flex items-end justify-end mx-auto my-5 gap-5">
                <button onClick={() => runPythonCode()} id="run-btn" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Run</button>
                <button id="clear-btn" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear</button>
            </div>
        </div>
    );
}
