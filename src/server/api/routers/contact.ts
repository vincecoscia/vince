import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { env } from "@/env";

const prisma = new PrismaClient();
sgMail.setApiKey(env.SENDGRID_API_KEY);

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, message } = input;

      try {
        // Save contact to database
        const contact = await prisma.contact.create({
          data: { name, email, message },
        });

        // Send email using SendGrid
        const msg = {
          to: "vince@vcmedia.io",
          from: env.SENDGRID_FROM_EMAIL, // Use the email address you verified with SendGrid
          subject: "New Contact Form Submission",
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await sgMail.send(msg);

        return { message: "Contact submitted successfully" };
      } catch (error) {
        console.error("Error processing contact:", error);
        throw new Error("Error processing contact");
      }
    }),
});