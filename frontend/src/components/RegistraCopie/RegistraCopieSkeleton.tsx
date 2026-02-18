export default function RegistraCopieSkeleton() {
  return (
    <div className="flex flex-col max-w-xl md:max-w-2xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] w-full mt-4">
      <div className="w-full h-[calc(100vh-250px)] overflow-hidden rounded-lg border bg-muted/30 flex flex-col gap-3 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[100px] rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
