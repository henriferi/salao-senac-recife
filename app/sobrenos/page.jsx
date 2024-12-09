import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";
import Logout from "../components/Logout";

export default function SobreNos() {
  return (
    <AuthGuard>
      <Loading delay={300} />
      <Logout />
      <div className="text-center bg-bgCards rounded-lg shadow-md p-6 mx-4 sm:mx-auto max-w-4xl">
        <img
          src="/senac.png"
          alt="Logo Senac"
          className="mx-auto w-32 h-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">
          Saiba mais sobre a Escola de Profissionais do Salão Senac!
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          A Escola de Profissionais do Salão Senac é referência em formação
          profissional. Aqui, nossos alunos têm acesso a treinamentos
          práticos, equipamentos de última geração e orientação de
          especialistas renomados no mercado da beleza. Nosso objetivo é formar
          profissionais capacitados e apaixonados pelo que fazem!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8 mx-4 sm:mx-auto max-w-6xl">
        <div className="rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-customBlue">
            Ambientes Modernos
          </h2>
          <p className="text-gray-600 p-2">
            O salão é equipado com ferramentas de última geração, simulando o
            mercado real para que os alunos se sintam confiantes desde o
            primeiro dia.
          </p>
          <img
            src="/senac-salaobg.jpg"
            alt="Ambiente do salão do Senac"
            className="rounded-lg object-cover mb-4"
          />
        </div>

        <div className="rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-customBlue">
            Aprendizado Prático
          </h2>
          <p className="text-gray-600 p-2">
            Nossos alunos praticam em modelos reais, com supervisão de
            professores experientes, garantindo excelência no atendimento e no
            resultado.
          </p>
          <img
            src="/senac-bg.jpg"
            alt="Alunos do Senac em ação"
            className="rounded-lg object-cover mb-4"
          />
        </div>

        <div className="rounded-lg shadow-lg p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-customBlue">
            Professores Renomados
          </h2>
          <p className="text-gray-600 p-2">
            Contamos com instrutores que são referências no mercado de beleza,
            trazendo o que há de mais moderno em técnicas e tendências.
          </p>
          <img
            src="/senac-match.jpg"
            alt="Instrutores do Senac"
            className="rounded-lg object-cover mb-4"
          />
        </div>
      </div>
    </AuthGuard>
  );
}
