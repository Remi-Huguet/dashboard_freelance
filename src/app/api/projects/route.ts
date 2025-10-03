import prisma from "@/lib/prisma";

interface ProjectBody {
  name: string;
  status: string;
  clientId: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: ProjectBody = await req.json();

    const project = await prisma.project.create({
        data: {
            name: body.name,
            status: body.status,
            clientId: body.clientId,
        },
    });

    return new Response(JSON.stringify(project), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const inProgress = searchParams.get("inProgress") === "true";

    let projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (inProgress) {
      projects = projects.filter((p) => p.status === "En cours")
    }

    projects.sort((a, b) => a.name.localeCompare(b.name));
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
