import prisma from "@/lib/prisma";

interface AppointmentBody {
  title: string;
  date: Date;
  projectId: string;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const currentWeek = searchParams.get("currentWeek") === "true";

    let appointments = await prisma.appointment.findMany({
      where: {
        projectId: (await context.params).id,
      },
      orderBy: { date: "asc" },
    });

    if (currentWeek) {
      const startOfWeek = new Date(new Date());
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(new Date().getDate() - new Date().getDay() + 1);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      appointments = appointments.filter((a: AppointmentBody) => {
        const date = new Date(a.date);
        return date >= startOfWeek && date <= endOfWeek;
      });
    }
    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
