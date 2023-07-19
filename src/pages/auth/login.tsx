import { AuthPage, ThemedTitleV2 } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";
import { Logo } from "../../assets/logo";

export function Login() {
  return (
    <AuthTemplate>
      <AuthPage
        type="login"
        title={
          <ThemedTitleV2 text="Trip Stash" icon={<Logo />} collapsed={false} />
        }
      />
    </AuthTemplate>
  );
}
