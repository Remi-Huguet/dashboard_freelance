import prisma from "@/lib/prisma";

interface Params {
  id: string;
}

interface ProjectBody {
  name: string;
  status: string;
  clientId: string;
}

export async function GET(req: Request, { params }: { params: Params }): Promise<Response> {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return new Response(JSON.stringify({ error: "Pas de projet trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }): Promise<Response> {
  try {
    const body: ProjectBody = await req.json();

    const project = await prisma.project.update({
      where: { id: params.id },
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

export async function DELETE(req: Request, { params }: { params: Params }): Promise<Response> {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify({ message: "Projet supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
