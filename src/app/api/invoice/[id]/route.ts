import prisma from "@/lib/prisma";

interface InvoiceBody {
    dateStart: Date;
    dateEnd: Date;
    pricingValue: number;
    pricingType: string;
    projectId: string;
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id: id },
    });

    if (!invoice) {
      return new Response(JSON.stringify({ error: "Pas de facture trouvé" }), { status: 404 });
    }

    return new Response(JSON.stringify(invoice), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    const body: InvoiceBody = await req.json();

    const invoice = await prisma.invoice.update({
      where: { id: id },
      data: {
        dateStart: body.dateStart,
        dateEnd: body.dateEnd,
        pricingValue: body.pricingValue,
        pricingType: body.pricingType,
        projectId: body.projectId
      },
    });

    return new Response(JSON.stringify(invoice), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    await prisma.invoice.delete({
      where: { id: id },
    });

    return new Response(JSON.stringify({ message: "Facture supprimé" }), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
