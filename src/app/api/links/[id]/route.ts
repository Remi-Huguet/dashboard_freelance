import prisma from "@/lib/prisma";

interface LinkBody {
  name: string;
  url: string;
  projectId: string;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const link = await prisma.link.findUnique({
      where: { id: id },
    });

    if (!link) {
      return new Response(JSON.stringify({ error: "Pas de lien trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const body: LinkBody = await req.json();

    const link = await prisma.link.update({
      where: { id: id },
      data: {
        name: body.name,
        url: body.url,
        projectId: body.projectId
      },
    });

    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    await prisma.link.delete({
      where: { id: id },
    });

    return new Response(JSON.stringify({ message: "Lien supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
