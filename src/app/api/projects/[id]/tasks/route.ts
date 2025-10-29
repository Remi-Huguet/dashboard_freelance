import prisma from "@/lib/prisma";

interface TaskBody {
  title: string,
  desc: string,
  type: string,
  done: boolean,
  projectId: string
}

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
        tasks = tasks.filter((task: TaskBody) => task.type === taskType)
    }

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
