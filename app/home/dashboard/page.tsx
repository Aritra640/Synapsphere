import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { CardTypes } from "@/lib/types";

import Card from "@/app/components/card";
import { DashboardCardArea } from "@/app/components/dashboardCardArea";
import { NewCardModal } from "@/app/components/newCardModal";
import { ShareModal } from "@/app/components/shareModal";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="text-red-400 p-6">
        Authentication failed — please log in again.
      </div>
    );
  }

  const cards = await prisma.card.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="flex justify-end gap-2">
        <ShareModal />
        <NewCardModal />
      </div>

      <br />

      <DashboardCardArea>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}                                    
            Type={card.type as CardTypes}
            Title={card.title}
            Content={card.content}
            CreatedAt={card.createdAt.toISOString()}        
          />
        ))}
      </DashboardCardArea>
    </>
  );
}

