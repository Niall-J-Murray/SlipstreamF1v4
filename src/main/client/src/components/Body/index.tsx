import { ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <div className="pt-16 min-h-screen flex flex-col">{children}</div>;
}
