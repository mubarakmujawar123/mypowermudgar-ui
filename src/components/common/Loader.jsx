import { Skeleton } from "../ui/skeleton";

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-4 h-[100vh]">
      <Skeleton className="h-12 w-12 rounded-full" />

      <div className="space-y-2">
        <Skeleton className="w-[250px] h-4" />
        <Skeleton className="w-[250px] h-4" />
      </div>
    </div>
  );
};

export default Loader;
