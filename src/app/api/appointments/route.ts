import prisma from "@/lib/prisma";

interface AppointmentBody {
  title: string;
  date: Date;
  projectId: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: AppointmentBody = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404 }
      );
    }

    const appointment = await prisma.appointment.create({
        data: {
            title: body.title,
            date: body.date,
            projectId: body.projectId
        },
    });

    return new Response(JSON.stringify(appointment), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const currentWeek = searchParams.get("currentWeek") === "true";

    let appointments = await prisma.appointment.findMany(
      {orderBy: { date: "asc" }}
    );

    if (currentWeek) {
      const startOfWeek = new Date(new Date());
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(new Date().getDate() - new Date().getDay() + 1);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      appointments = appointments.filter((a) => {
        const date = new Date(a.date);
        return date >= startOfWeek && date <= endOfWeek;
      });
    }
    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
