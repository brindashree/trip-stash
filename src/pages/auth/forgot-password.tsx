import { AuthPage } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";

export function ForgotPassword() {
  return (
    <AuthTemplate>
      <AuthPage type="forgotPassword" />;
    </AuthTemplate>
  );
}
