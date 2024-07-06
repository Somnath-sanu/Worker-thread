import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const [result, setResult] = useState(0);
  const [worker, setWorker] = useState<Worker | null>(null);

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    const workerInstance = new Worker(new URL("/worker.ts", import.meta.url));
    //? pathname , origin

    setWorker(workerInstance);

    return () => {
      workerInstance.terminate();
    };
  }, []);

  // ?console.log(new URL("/worker.ts", import.meta.url));
  /**
   * {
    origin: 'http://localhost:5173',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:5173',
    hostname: 'localhost',
    port: '5173',
    pathname: '/worker.ts',
    search: '',
    searchParams: URLSearchParams { size: 0 },
    hash: '',
    href: 'http://localhost:5173/worker.ts' 
  }
   * 
   */
  // console.log(import.meta.url);
  //* 'http://localhost:5173/src/App.tsx?t=1720295421115
  //* origin: http://localhost:5173

  const calculate = (number: number) => {
    if (worker) {
      console.log("message sent!");

      worker.postMessage({ number });

      worker.onmessage = (event) => {
        setResult(event.data);
      };
    }
  };

  return (
    <div className="bg-slate-600 h-screen">
      <h1 className="text-center text-5xl pb-4 text-slate-400">
        Worker thread
      </h1>
      <div className="flex gap-4 pt-4 w-full justify-center">
        <div className="space-x-3 space-y-4">
          <h1 className="text-3xl ">{"COUNT :" + count}</h1>
          <button
            className="bg-blue-400 px-2 py-1 text-center rounded-full"
            onClick={handleCount}
          >
            Increase count
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-8 space-x-3">
        <h1 className="text-3xl">{"RESULT :" + result}</h1>
        <button
          className="bg-blue-400 px-2 py-1 text-center rounded-full"
          onClick={() => calculate(500000000)}
        >
          heavy process
        </button>

        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
      </div>
    </div>
  );
}

export default App;
