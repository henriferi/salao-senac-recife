import prisma from "../../../lib/prisma";

interface Feedback {
    id?: number;
    nome: string;
    comentario: string;
    estrelas: number;
}

export async function POST(req: Request): Promise<Response> {
    try {
        const body: Feedback = await req.json();

        const { nome, comentario, estrelas } = body;

        if (!nome || !comentario || estrelas === undefined) {
            return new Response("Nome, comentário e estrelas são obrigatórios.", { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                nome,
                comentario,
                estrelas: parseInt(estrelas.toString()),
            },
        });

        return new Response(JSON.stringify(feedback), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Erro ao criar feedback.", { status: 500 });
    }
}

export async function GET(): Promise<Response> {
    try {
        const feedbacks = await prisma.feedback.findMany({
            orderBy: { createdAt: "desc" },
        });

        return new Response(JSON.stringify(feedbacks), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Erro ao listar feedback.", { status: 500 });
    }
}

export async function PUT(req: Request): Promise<Response> {
    try {
        const body: Partial<Feedback> = await req.json();

        const { id, nome, comentario, estrelas } = body;

        if (!id) {
            return new Response("ID é obrigatório.", { status: 400 });
        }

        const dadosParaAtualizar: Partial<Feedback> = {};
        if (nome) dadosParaAtualizar.nome = nome;
        if (comentario) dadosParaAtualizar.comentario = comentario;
        if (estrelas !== undefined) dadosParaAtualizar.estrelas = parseInt(estrelas.toString());

        if (Object.keys(dadosParaAtualizar).length === 0) {
            return new Response("Nenhum campo válido para atualizar.", { status: 400 });
        }

        const feedbackAtualizado = await prisma.feedback.update({
            where: { id: parseInt(id.toString()) },
            data: dadosParaAtualizar,
        });

        return new Response(JSON.stringify(feedbackAtualizado), { status: 200 });
    } catch (error) {
        console.error("Erro no método PUT:", error);
        return new Response("Erro ao atualizar feedback.", { status: 500 });
    }
}

export async function DELETE(req: Request): Promise<Response> {
    try {
        const body: { id: number } = await req.json();

        const { id } = body;

        if (!id) {
            return new Response("ID é obrigatório.", { status: 400 });
        }

        await prisma.feedback.delete({
            where: { id: parseInt(id.toString()) },
        });

        return new Response("Feedback excluído com sucesso.", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Erro ao excluir feedback.", { status: 500 });
    }
}
