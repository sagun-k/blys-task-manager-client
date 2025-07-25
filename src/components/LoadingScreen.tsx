const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-6 bg-white animate-fade-in">
      {/* Spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="flex items-center gap-1 text-3xl text-orange-600">
        <span>Blys</span>
        <span className="animate-bounce text-2xl">.</span>
        <span className="animate-bounce text-2xl delay-200">.</span>
        <span className="animate-bounce text-2xl delay-400">.</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
