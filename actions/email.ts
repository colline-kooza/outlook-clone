"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  content: string;
  fromId: string;
}

export async function sendEmail(data: EmailData) {
  try {
    const toUser = await db.user.findUnique({
      where: { email: data.to }
    });

    if (!toUser) {
      return {
        error: "Recipient not found in the system",
        status: 404
      };
    }

    const email = await db.email.create({
      data: {
        subject: data.subject,
        content: data.content,
        fromId: data.fromId,
        toId: toUser.id,
      },
      include: {
        from: true,
        to: true,
      }
    });

  const emails=  await resend.emails.send({
      from: "OUT-LOOK-CLONE <info@kyaja.com>",
      to: [data.to],
      subject: data.subject,
      
      html: data.content,
    });
     console.log(emails , "the emails")
    revalidatePath("/");
    return { status: 200, data: email };
  } catch (error) {
    console.error("Send email error:", error);
    return { error: "Failed to send email", status: 500 };
  }
}
export async function getUserEmails(userId: string) {
  const emails = await db.email.findMany({
    where: {
      OR: [{ fromId: userId }, { toId: userId }],
    },
    include: {
      from: {
        select: { name: true, email: true, image: true },
      },
      to: {
        select: { name: true, email: true, image: true },
      },
    },
    orderBy: {
      createdAt: "desc", // Ensures newest emails appear first
    },
  });

  const formattedEmails = emails.map((email) => ({
    id: email.id,
    createdAt: email.createdAt,
    updatedAt: email.updatedAt,
    subject: email.subject,
    content: email.content,
    fromId: email.fromId,
    toId: email.toId,
    from: {
      name: email.from.name,
      email: email.from.email,
      image: email.from.image,
    },
    to: {
      name: email.to.name,
      email: email.to.email,
      image: email.to.image,
    },
    read: email.read,
  }));

  return {
    received: formattedEmails.filter((email) => email.toId === userId),
    sent: formattedEmails.filter((email) => email.fromId === userId),
  };
}

  

export async function getEmailById(emailId: string) {
  try {
    const email = await db.email.findUnique({
      where: { id: emailId },
      include: {
        from: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        to: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    if (!email) {
      return { error: "Email not found", status: 404 };
    }

    return { status: 200, data: email };
  } catch (error) {
    console.error("Fetch email error:", error);
    return { error: "Failed to fetch email", status: 500 };
  }
}

export async function markAsRead(emailId: string) {
  try {
    await db.email.update({
      where: { id: emailId },
      data: { read: true }
    });

    revalidatePath("/mail");
    return { status: 200 };
  } catch (error) {
    console.error("Mark as read error:", error);
    return { error: "Failed to mark as read", status: 500 };
  }
}
export async function deleteEmail(emailId: string) {
  try {
    await db.email.delete({
      where: { id: emailId },
    })
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to delete email." }
  }
}