function Loading() {
  return (
    <div className="w-full min-h-screen flex gap-2 justify-center items-center">
      {[1, 2, 3].map((item) => {
        return (
          <div
            key={item}
            className="w-4 h-4 rounded-sm bg-[#31b] animate-pulse"
          />
        );
      })}
    </div>
  );
}

export default Loading;
