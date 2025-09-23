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
    await prisma.project.delete({
      where: { id: id },
    });

    return new Response(JSON.stringify({ message: "Projet supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
