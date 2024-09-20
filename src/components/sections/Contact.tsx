import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
export default function Contact() {
  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold">
        <span className="text-purple-600">{"async function "}</span>
        Contact() {"{"}
      </h2>
      <Card>
        <CardContent>
          <form className="space-y-4 p-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-4 text-right">{"}"}</p>
    </section>
  );
}
