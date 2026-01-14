"use server";

import prisma from "../../prisma/db";

import { revalidatePath } from "next/cache";

import { IComment, IPost } from "@/interfaces/Post";

export async function incrementThumbsUp(post: IPost) {
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

export async function postComment(post: IPost, formData: FormData) {
  const author = await prisma.user.findFirst({
    where: {
      username: "anabeatriz_dev",
    },
  });

  const text = formData.get("text")?.toString() ?? "";
  await prisma.comment.create({
    data: {
      text,
      authorId: author!.id,
      postId: post.id,
    },
  });

  revalidatePath("/");
  revalidatePath(`/${post.slug}`);
}

export async function postReply(parent: IComment, formData: FormData) {
  const author = await prisma.user.findFirst({
    where: {
      username: "anabeatriz_dev",
    },
  });

  const post = await prisma.post.findFirst({
    where: {
      id: parent.postId,
    },
  });

  await prisma.comment.create({
    data: {
      text: formData.get("text")?.toString() ?? "",
      authorId: author!.id,
      postId: post!.id,
      parentId: parent.id,
    },
  });

  revalidatePath("/");
  revalidatePath(`/${post!.slug}`);
}
