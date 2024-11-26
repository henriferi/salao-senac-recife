import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma'; // Certifique-se de que você tem a configuração correta do Prisma

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Todos os campos são obrigatórios' }), { status: 400 });
  }

  // Verificar se o usuário já existe no banco
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return new Response(JSON.stringify({ message: 'Este email já está registrado.' }), { status: 400 });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o novo usuário no banco de dados
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Gerar o JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return new Response(JSON.stringify({ token }), { status: 201 });
}
