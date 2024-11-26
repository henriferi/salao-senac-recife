import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";

export default function FeedbackPremiado() {

  return (
    <AuthGuard>
      <Loading delay={300} />
      <div>FeedbackPremiado</div>
    </AuthGuard>
  );
}
