import AuthGuard from "./components/AuthGuard";
import Loading from "./components/Loading";


export default function Home() {

  return (
    <AuthGuard>
      <Loading delay={300} />
      <div className="h-screen">Home</div>
    </AuthGuard>
  );
}
