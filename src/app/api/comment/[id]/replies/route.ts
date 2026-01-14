import { NextRequest } from "next/server";
import prisma from "../../../../../../prisma/db";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: Context) {
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
