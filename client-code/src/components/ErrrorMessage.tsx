import type { PropsWithChildren } from "react";


export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="bg-red-900 border border-red-900 text-white px-4 py-3 rounded mb-4">
      {children}
    </div>
  );
}