import React from "react";

function AuthTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-100">
      <div>{children}</div>
    </div>
  );
}

export default AuthTemplate;
