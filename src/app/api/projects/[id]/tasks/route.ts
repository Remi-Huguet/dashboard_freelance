import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const taskType = searchParams.get("taskType");

    let tasks = await prisma.task.findMany({
      where: {
        projectId: (await context.params).id,
      },
    });

    if (taskType) {
        tasks = tasks.filter((task) => task.type === taskType)
    }

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
