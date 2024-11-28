import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";
import Logout from "../components/Logout";

export default function SobreNos() {

  return (
    <AuthGuard>
      <Loading delay={300} />
      <Logout />
      <div>Sobre Nos</div>
    </AuthGuard>
  );
}
