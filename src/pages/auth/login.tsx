import { AuthPage, ThemedTitleV2 } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";

export function Login() {
  return (
    <AuthTemplate>
      <AuthPage
        type="login"
        title={
          <ThemedTitleV2
            text="Trip Stash"
           // icon={<img src="https://refine.dev/img/logo.png" />}
            collapsed={false}
          />
        }
      />
    </AuthTemplate>
  );
}
