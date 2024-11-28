import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma'; // Certifique-se de que você tem a configuração correta do Prisma

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email e senha são obrigatórios' }), { status: 400 });
  }

  // Procurar o usuário no banco
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: 'Usuário não encontrado' }), { status: 401 });
  }

  // Verificar a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Senha incorreta' }), { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, userName: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  return new Response(JSON.stringify({ token, name: user.name}), { status: 200 });
}
