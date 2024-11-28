import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";

export default function Contato() {

  return (
    <AuthGuard>
      <Loading delay={300} />
      <div>Contato</div>
    </AuthGuard>
  );
}
