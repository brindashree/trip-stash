import { IconBrandGoogle } from "@tabler/icons";
import { AuthPage } from "@refinedev/chakra-ui";
import AuthTemplate from "../../components/auth-template/auth-template";

export function Login() {
  return (
    <AuthTemplate>
      <AuthPage type="login" />
    </AuthTemplate>
  );
}
