export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8 bg-gray-100">
      {/* Centered Search Bar */}
      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg bg-white shadow-md"
        />
      </div>
    </div>
  );
}

