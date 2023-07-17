import { AuthPage } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";

export function Register() {
  return (
    <AuthTemplate>
      <AuthPage type="register" />;
    </AuthTemplate>
  );
}
