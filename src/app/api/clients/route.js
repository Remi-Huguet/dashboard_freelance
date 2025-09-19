import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await prisma.client.create({
      data: {
        name: body.name,
        surname: body.surname,
        email: body.email,
        company: body.company || null,
      },
    });

    return new Response(JSON.stringify(client), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(clients), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
