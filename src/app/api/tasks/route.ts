import prisma from "@/lib/prisma";

interface TaskBody {
  title: string,
  desc: string,
  type: string,
  done: boolean,
  projectId: string
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: TaskBody = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404 }
      );
    }

    const task = await prisma.task.create({
        data: {
            title: body.title,
            desc: body.desc,
            type: body.type,
            done: body.done,
            projectId: body.projectId,
        },
    });

    return new Response(JSON.stringify(task), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const taskType = searchParams.get("taskType");

    let tasks = await prisma.task.findMany();

    if (taskType) {
        tasks = tasks.filter((task) => task.type === taskType)
    }

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
