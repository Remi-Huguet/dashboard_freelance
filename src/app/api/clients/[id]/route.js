import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: params.id },
    });

    if (!client) {
      return new Response(JSON.stringify({ error: "Client not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(client), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const client = await prisma.client.update({
      where: { id: params.id },
      data: {
        name: body.name,
        surname: body.surname,
        email: body.email,
        company: body.company || null,
      },
    });

    return new Response(JSON.stringify(client), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.client.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify({ message: "Client deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
