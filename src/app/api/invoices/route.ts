import prisma from "@/lib/prisma";

interface InvoiceBody {
    dateStart: Date;
    dateEnd: Date;
    pricingValue: number;
    pricingType: string;
    projectId: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: InvoiceBody = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: body.projectId },
    });

    if (!project) {
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404 }
      );
    }

    const existingInvoice = await prisma.invoice.findFirst({
      where: { projectId: body.projectId },
    });

    if (existingInvoice) {
      return new Response(
          JSON.stringify({ error: "Une facture existe déjà pour ce projet." }),
          { status: 400 }
      );
    }

    const invoice = await prisma.invoice.create({
        data: {
            dateStart: body.dateStart,
            dateEnd: body.dateEnd,
            pricingValue: body.pricingValue,
            pricingType: body.pricingType,
            projectId: body.projectId
        },
    });

    return new Response(JSON.stringify(invoice), { status: 201 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const invoices = await prisma.invoice.findMany();
    return new Response(JSON.stringify(invoices), { status: 200 });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "Une erreur est survenue" }), { status: 500 });
  }
}
