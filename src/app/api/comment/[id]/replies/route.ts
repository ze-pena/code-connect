import prisma from "../../../../../../prisma/db";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const query = await prisma.comment.findMany({
    where: {
      parentId: Number.parseInt(id),
    },
    include: {
      author: true,
      children: true,
    },
  });

  return Response.json(query);
}
