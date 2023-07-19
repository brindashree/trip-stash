import { AuthPage } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";
import { ThemedTitleV2 } from "@refinedev/chakra-ui";
import { Logo } from "../../assets/logo";

export function Register() {
  return (
    <AuthTemplate>
      <AuthPage
        title={
          <ThemedTitleV2 text="Trip Stash" icon={<Logo />} collapsed={false} />
        }
        type="register"
      />
      ;
    </AuthTemplate>
  );
}
