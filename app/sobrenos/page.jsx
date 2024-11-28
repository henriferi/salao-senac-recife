import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";

export default function SobreNos() {

  return (
    <AuthGuard>
      <Loading delay={300} />
      <div>Sobre Nos</div>
    </AuthGuard>
  );
}
