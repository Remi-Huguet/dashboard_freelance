import prisma from "@/lib/prisma";

interface LinkBody {
  name: string;
  url: string;
  projectId: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: LinkBody = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404 }
      );
    }

    const link = await prisma.link.create({
        data: {
            name: body.name,
            url: body.url,
            projectId: body.projectId,
        },
    });

    return new Response(JSON.stringify(link), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const links = await prisma.link.findMany();
    return new Response(JSON.stringify(links), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
