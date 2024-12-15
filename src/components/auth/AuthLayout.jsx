import { Outlet } from "react-router-dom";

function AuthLayout() {
  console.log("in 1");
  return (
    <div className="flex min-h-[calc(100vh-150px)] w-full">
      <div className="hidden lg:flex items-center justify-center bg-slate-500 w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to myPowerMudgar online Shop
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
