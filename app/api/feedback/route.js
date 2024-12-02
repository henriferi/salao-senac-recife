import prisma from  "@/lib/prisma";

export async function POST(req) {
    try {
        const { nome, comentario, estrelas } = await req.json();

        if (!nome || !comentario || !estrelas) {
            return new Response("Nome, comentário e estrelas são obrigatórios.", { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: { 
              nome, 
              comentario, 
              estrelas: parseInt(estrelas),  
            },
          });          
                  
        return new Response(JSON.stringify(feedback), { status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Erro ao criar feedback.", { status: 500 });
    }
}

export async function GET() {
    try {
        const feedbacks = await prisma.feedback.findMany({
            orderBy: { createdAt: "desc" },
        });

        return new Response(JSON.stringify(feedbacks), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Erro ao listar feedback.", { status: 500 });
    }
}
