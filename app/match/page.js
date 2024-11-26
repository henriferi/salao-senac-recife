import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";

export default function Match() {

  return (
    <AuthGuard>
      <Loading delay={300} />
      <div>Match</div>
    </AuthGuard>
  );
}
