import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const invoice = await prisma.invoice.findFirst({
      where: {
        projectId: (await context.params).id,
      },
    });

    return new Response(JSON.stringify(invoice), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
