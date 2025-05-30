
async function getHealthStatus() {
  const res = await fetch('http://localhost:3001/api/health', {
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch health status: ${res.status}`);
  }

  return res.text();
}

export default async function Page() {
  let healthStatus = 'Loading...';

  try {
    healthStatus = await getHealthStatus();
  } catch (error) {
    console.error('Error fetching health status:', error);
    healthStatus = 'Error fetching status';
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="text-2xl font-bold">Backend Health Status:</h1>
        <p className="ml-2 text-xl">{healthStatus}</p>
      </div>
    </main>
  );
}

