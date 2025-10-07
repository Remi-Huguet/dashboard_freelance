import prisma from "@/lib/prisma";

interface ProjectBody {
  name: string;
  status: string;
  clientId: string;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const project = await prisma.project.findUnique({
      where: { id: id },
    });

    if (!project) {
      return new Response(JSON.stringify({ error: "Pas de projet trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const body: ProjectBody = await req.json();

    const client = await prisma.client.findUnique({
      where: { id: body.clientId },
    });

    if (!client) {
      return new Response(
        JSON.stringify({ error: "Client introuvable" }),
        { status: 404 }
      );
    }

    const project = await prisma.project.update({
      where: { id: id },
      data: {
        name: body.name,
        status: body.status,
        clientId: body.clientId
      },
    });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;

    await prisma.$transaction([
      prisma.link.deleteMany({
        where: { projectId: id },
      }),
      prisma.appointment.deleteMany({
        where: { projectId: id },
      }),
      prisma.task.deleteMany({
        where: { projectId: id },
      }),
      prisma.project.delete({
        where: { id },
      }),
    ]);

    return new Response(JSON.stringify({ message: "Projet supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
