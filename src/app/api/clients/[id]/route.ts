import prisma from "@/lib/prisma";

interface ClientBody {
  name: string;
  surname: string;
  email: string;
  company?: string | null;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const client = await prisma.client.findUnique({
      where: { id: id },
    });

    if (!client) {
      return new Response(JSON.stringify({ error: "Aucun client trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(client), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const body: ClientBody = await req.json();

    const client = await prisma.client.update({
      where: { id: id },
      data: {
        name: body.name,
        surname: body.surname,
        email: body.email,
        company: body.company ?? null,
      },
    });

    return new Response(JSON.stringify(client), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;

    const projects = await prisma.project.findMany({
      where: { clientId: id },
    });

    if (projects.length > 0) {
      return new Response(JSON.stringify({ error: "Impossible de supprimer le client avec des projets associés" }), { status: 400 });
    }

    await prisma.client.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Client supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
