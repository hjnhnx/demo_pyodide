import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/piston')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-3">
        {/* <a href="/pyodide" className="h-10 bg-slate-400 flex justify-center items-center p-3 rounded">Python only</a> */}
        <a href="/piston" className="h-10 bg-slate-400 flex justify-center items-center p-3 rounded">Multipe langs</a>
      </div>
    </main>
  );
}
