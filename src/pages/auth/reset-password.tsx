import { AuthPage } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";

export function ResetPassword() {
  return (
    <AuthTemplate>
      <AuthPage type="updatePassword" />;
    </AuthTemplate>
  );
}
