import { useLocation } from "react-router-dom";

export default function ComingSoon() {
  const { pathname } = useLocation();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold">Coming Soon</h1>
      <p className="text-muted-foreground mt-2">
        {pathname} is under development
      </p>
    </div>
  );
}
