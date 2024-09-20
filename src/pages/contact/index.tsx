import { useState } from "react";
import { api } from "@/utils/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { NextPage } from "next";

const ContactPage: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const contactMutation = api.contact.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await contactMutation.mutateAsync({ name, email, message });
      toast({
        title: "Message sent",
        description: "Your message has been sent to Vince.",
        variant: "success",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your message. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <section>
        <h2 className="mb-8 text-3xl font-bold">
          <span className="text-purple-600">{"async function "}</span>
          Contact() {"{"}
        </h2>
        <Card>
          <CardContent>
            <form className="space-y-4 p-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
              {contactMutation.error && <p className="mt-2 text-sm">{contactMutation.error.message}</p>}
            </form>
          </CardContent>
        </Card>
        <p className="mt-4 text-right">{"}"}</p>
      </section>
    </>
  );
};

export default ContactPage;
