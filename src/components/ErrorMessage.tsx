import { PropsWithChildren } from "react";

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center rounded-lg">
      {children}
    </p>
  );
};
