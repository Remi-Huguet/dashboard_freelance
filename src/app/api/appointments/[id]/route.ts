import prisma from "@/lib/prisma";

interface AppointmentBody {
  title: string;
  date: Date;
  projectId: string;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id: id },
    });

    if (!appointment) {
      return new Response(JSON.stringify({ error: "Pas de rendez-vous trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const body: AppointmentBody = await req.json();

    const appointment = await prisma.appointment.update({
      where: { id: id },
      data: {
        title: body.title,
        date: body.date,
        projectId: body.projectId
      },
    });

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    await prisma.appointment.delete({
      where: { id: id },
    });

    return new Response(JSON.stringify({ message: "Rendez-vous supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
