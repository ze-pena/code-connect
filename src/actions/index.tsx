import prisma from "../../prisma/db";

import { revalidatePath } from "next/cache";

import { IPost } from "@/interfaces/Post";

export async function incrementThumbsUp(post: IPost) {
  "use server";

  await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  revalidatePath("/");
  revalidatePath(`/${post.slug}`);
}
