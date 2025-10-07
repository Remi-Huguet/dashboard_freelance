import prisma from "@/lib/prisma";

interface TaskBody {
  title: string,
  desc: string,
  type: string,
  done: boolean,
  projectId: string
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      return new Response(JSON.stringify({ error: "Pas de tâche trouvée" }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const body: TaskBody = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404 }
      );
    }

    const task = await prisma.task.update({
      where: { id: id },
      data: {
        title: body.title,
        desc: body.desc,
        type: body.type,
        done: body.done,
        projectId: body.projectId
      },
    });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;

    await prisma.task.delete({
        where: { id },
    });

    return new Response(JSON.stringify({ message: "Tâche supprimée" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
