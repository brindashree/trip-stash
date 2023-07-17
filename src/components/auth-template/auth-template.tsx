import React from "react";
import { useIsAuthenticated, useNavigation } from "@refinedev/core";

function AuthTemplate({ children }: { children: React.ReactNode }) {
  const { data } = useIsAuthenticated();
  const { push } = useNavigation();

  if (data?.authenticated) push("/projects");

  return (
    <div
      style={{
        background:
          "url(https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>{children}</div>
    </div>
  );
}

export default AuthTemplate;
