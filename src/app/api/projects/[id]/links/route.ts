import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const links = await prisma.link.findMany({
      where: {
        projectId: (await context.params).id,
      },
    });
    return new Response(JSON.stringify(links), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
