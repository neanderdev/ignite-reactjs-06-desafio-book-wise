import { NextApiRequest, NextApiResponse } from "next/types";

import { prisma } from "@/services/database/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const bookId = String(req.query.id);

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  return res.status(200).json({ book });
}
