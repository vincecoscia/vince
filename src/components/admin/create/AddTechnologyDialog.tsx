import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Si from "react-icons/si";

export function AddTechnologyDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mainColor, setMainColor] = useState("");
  const [colorShade, setColorShade] = useState("");

  const { toast } = useToast();
  const utils = api.useUtils();
  const addTechnologyMutation = api.technology.create.useMutation({
    onSuccess: () => {
      // Invalidate the query to refetch the technologies
      utils.technology.getAll.invalidate();

      toast({
        title: "Technology added successfully",
        description: "Your new technology has been added to the list.",
        variant: "success",
      });
      setOpen(false);
      // Reset form fields
      setName("");
      setMainColor("");
      setColorShade("");
      setIcon("");
    },
    onError: (error) => {
      toast({
        title: "Error adding technology",
        description:
          "There was a problem adding the technology. Please try again.",
        variant: "destructive",
      });
    },
  });

  const tailwindColors = [
    {
      name: "Red",
      variations: [
        "bg-red-400",
        "bg-red-500",
        "bg-red-600",
        "bg-red-700",
        "bg-red-800",
        "bg-red-900",
      ],
    },
    {
      name: "Blue",
      variations: [
        "bg-blue-400",
        "bg-blue-500",
        "bg-blue-600",
        "bg-blue-700",
        "bg-blue-800",
        "bg-blue-900",
      ],
    },
    {
      name: "Green",
      variations: [
        "bg-green-400",
        "bg-green-500",
        "bg-green-600",
        "bg-green-700",
        "bg-green-800",
        "bg-green-900",
        "bg-green-950",
      ],
    },
    {
      name: "Black",
      variations: [
        "bg-black",
        "bg-black",
        "bg-black",
        "bg-black",
        "bg-black",
        "bg-black",
        "bg-black",
      ],
    },
    {
      name: "Cyan",
      variations: [
        "bg-cyan-400",
        "bg-cyan-500",
        "bg-cyan-600",
        "bg-cyan-700",
        "bg-cyan-800",
        "bg-cyan-900",
        "bg-cyan-950",
      ],
    },
    {
      name: "Yellow",
      variations: [
        "bg-yellow-400",
        "bg-yellow-500",
        "bg-yellow-600",
        "bg-yellow-700",
        "bg-yellow-800",
        "bg-yellow-900",
        "bg-yellow-950",
      ],
    },
    {
      name: "Purple",
      variations: [
        "bg-purple-400",
        "bg-purple-500",
        "bg-purple-600",
        "bg-purple-700",
        "bg-purple-800",
        "bg-purple-900",
      ],
    },
    {
      name: "Pink",
      variations: [
        "bg-pink-400",
        "bg-pink-500",
        "bg-pink-600",
        "bg-pink-700",
        "bg-pink-800",
        "bg-pink-900",
      ],
    },
    {
      name: "Indigo",
      variations: [
        "bg-indigo-400",
        "bg-indigo-500",
        "bg-indigo-600",
        "bg-indigo-700",
        "bg-indigo-800",
        "bg-indigo-900",
      ],
    },
    {
      name: "Teal",
      variations: [
        "bg-teal-400",
        "bg-teal-500",
        "bg-teal-600",
        "bg-teal-700",
        "bg-teal-800",
        "bg-teal-900",
      ],
    },
    {
      name: "Orange",
      variations: [
        "bg-orange-400",
        "bg-orange-500",
        "bg-orange-600",
        "bg-orange-700",
        "bg-orange-800",
        "bg-orange-900",
      ],
    },
    {
      name: "Gray",
      variations: [
        "bg-gray-400",
        "bg-gray-500",
        "bg-gray-600",
        "bg-gray-700",
        "bg-gray-800",
        "bg-gray-900",
      ],
    },
  ];

  const iconOptions = [
    { name: "React", icon: Si.SiReact, iconName: "SiReact" },
    { name: "Angular", icon: Si.SiAngular, iconName: "SiAngular" },
    { name: "NextJS", icon: Si.SiNextdotjs, iconName: "SiNextdotjs" },
    { name: "JavaScript", icon: Si.SiJavascript, iconName: "SiJavascript" },
    { name: "TypeScript", icon: Si.SiTypescript, iconName: "SiTypescript" },
    { name: "Node.js", icon: Si.SiNodedotjs, iconName: "SiNodedotjs" },
    { name: "Python", icon: Si.SiPython, iconName: "SiPython" },
    { name: "Tailwind", icon: Si.SiTailwindcss, iconName: "SiTailwindcss" },
    { name: "MySQL", icon: Si.SiMysql, iconName: "SiMysql" },
    { name: "AWS", icon: Si.SiAmazon, iconName: "SiAmazon" },
    { name: "Prisma", icon: Si.SiPrisma, iconName: "SiPrisma" },
    { name: "Vue", icon: Si.SiVuedotjs, iconName: "SiVuedotjs" },
    { name: "C#", icon: Si.SiCsharp, iconName: "SiCsharp" },
    { name: "PHP", icon: Si.SiPhp, iconName: "SiPhp" },
    { name: "Express.js", icon: Si.SiExpress, iconName: "SiExpress" },
    { name: "WordPress", icon: Si.SiWordpress, iconName: "SiWordpress" },
    { name: "Laravel", icon: Si.SiLaravel, iconName: "SiLaravel" },
    { name: "Ruby", icon: Si.SiRuby, iconName: "SiRuby" },
    { name: "Go", icon: Si.SiGo, iconName: "SiGo" },
    { name: "Rust", icon: Si.SiRust, iconName: "SiRust" },
    { name: "Swift", icon: Si.SiSwift, iconName: "SiSwift" },
    { name: "Kotlin", icon: Si.SiKotlin, iconName: "SiKotlin" },
    { name: "Docker", icon: Si.SiDocker, iconName: "SiDocker" },
    { name: "Kubernetes", icon: Si.SiKubernetes, iconName: "SiKubernetes" },
    { name: "Azure", icon: Si.SiMicrosoftazure, iconName: "SiMicrosoftazure" },
    { name: "Google Cloud", icon: Si.SiGooglecloud, iconName: "SiGooglecloud" },
    { name: "MongoDB", icon: Si.SiMongodb, iconName: "SiMongodb" },
    { name: "PostgreSQL", icon: Si.SiPostgresql, iconName: "SiPostgresql" },
    { name: "Redis", icon: Si.SiRedis, iconName: "SiRedis" },
    { name: "GraphQL", icon: Si.SiGraphql, iconName: "SiGraphql" },
    { name: "Git", icon: Si.SiGit, iconName: "SiGit" },
    { name: "GitHub", icon: Si.SiGithub, iconName: "SiGithub" },
    { name: "GitLab", icon: Si.SiGitlab, iconName: "SiGitlab" },
    { name: "Webpack", icon: Si.SiWebpack, iconName: "SiWebpack" },
    { name: "Babel", icon: Si.SiBabel, iconName: "SiBabel" },
    { name: "Electron", icon: Si.SiElectron, iconName: "SiElectron" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!mainColor) newErrors.color = "Color is required";
    if (!colorShade && mainColor !== "black")
      newErrors.color = "Shade is required";
    if (!icon) newErrors.icon = "Icon is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addTechnologyMutation.mutate({
        name,
        color:
          mainColor === "black" ? "black" : `${mainColor}-${colorShade}`,
        icon,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add New Technology
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Technology</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`col-span-3 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mainColor" className="text-right">
                Color
              </Label>
              <Select value={mainColor} onValueChange={setMainColor}>
                <SelectTrigger
                  className={`col-span-3 ${errors.color ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {tailwindColors.map((colorOption) => (
                    <SelectItem
                      key={colorOption.name}
                      value={colorOption.name.toLowerCase()}
                    >
                      <div className="flex items-center">
                        <div
                          className={`mr-2 h-4 w-4 rounded-full ${colorOption.variations[1]}`}
                        ></div>
                        {colorOption.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.color}
                </p>
              )}
            </div>
            {mainColor && mainColor !== "black" && (
              <div className="mt-2 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="colorShade" className="text-right">
                  Shade
                </Label>
                <Select value={colorShade} onValueChange={setColorShade}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a shade" />
                  </SelectTrigger>
                  <SelectContent>
                    {tailwindColors
                      .find((c) => c.name.toLowerCase() === mainColor)
                      ?.variations.map((variation) => (
                        <SelectItem
                          key={variation}
                          value={variation.split("-")[2] ?? ""}
                        >
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-4 w-4 rounded-full ${variation}`}
                            ></div>
                            {variation.split("-")[2]}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger
                  className={`col-span-3 ${errors.icon ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.name} value={option.iconName}>
                      <div className="flex items-center">
                        <option.icon className="mr-2 h-4 w-4" />
                        {option.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.icon && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.icon}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Technology</Button>
          </div>
        </form>
      </DialogContent>
      <DialogDescription />
    </Dialog>
  );
}
