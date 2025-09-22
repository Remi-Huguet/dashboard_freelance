import prisma from "@/lib/prisma";

interface ClientBody {
  name: string;
  surname: string;
  email: string;
  company?: string | null;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: ClientBody = await req.json();

    const client = await prisma.client.create({
      data: {
        name: body.name,
        surname: body.surname,
        email: body.email,
        company: body.company ?? null,
      },
    });

    return new Response(JSON.stringify(client), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function GET(): Promise<Response> {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    clients.sort((a, b) => a.name.localeCompare(b.name));
    return new Response(JSON.stringify(clients), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
