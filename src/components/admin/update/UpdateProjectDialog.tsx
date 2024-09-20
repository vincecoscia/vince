/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import MultipleSelector, { type Option } from '@/components/ui/multiple-selector';
import { api } from "@/utils/api";
import { type Technology, type Project } from "@prisma/client";

interface UpdateProjectDialogProps {
  project: Project & { technologies: Technology[] };
  technologies: Technology[];
  onUpdate: () => void;
  children: React.ReactNode;
}

export function UpdateProjectDialog({ project, technologies, onUpdate, children }: UpdateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || '');
  const [link, setLink] = useState(project.link || '');
  const [order, setOrder] = useState(project.order || 0);
  const [live, setLive] = useState(project.live || false);
  const [githubLink, setGithubLink] = useState(project.githubLink || '');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    project.technologies.map(tech => tech.id)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();
  const utils = api.useUtils();
  const updateProjectMutation = api.project.update.useMutation();

  useEffect(() => {
    if (open) {
      setTitle(project.title);
      setDescription(project.description || '');
      setLink(project.link || '');
      setOrder(project.order || 0);
      setSelectedTechnologies(project.technologies.map(tech => tech.id));
      setLive(project.live || false);
      setGithubLink(project.githubLink || '');
    }
  }, [open, project]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!order) newErrors.order = 'Order is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await updateProjectMutation.mutateAsync({
          id: project.id,
          title,
          description,
          technologies: selectedTechnologies,
          link,
          order,
          live,
          githubLink,
        });
        toast({
          title: "Project updated successfully",
          description: "Your project has been updated.",
        });
        utils.project.getAll.invalidate();
        setOpen(false);
        onUpdate();
      } catch (error) {
        toast({
          title: "Error updating project",
          description: "There was a problem updating your project. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`col-span-3 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`col-span-3 border border-input bg-background rounded-md p-2 ${errors.description ? 'border-red-500' : ''}`}
                rows={3}
              />
              {errors.description && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="live" className="text-right">
                Live
              </Label>
              <Switch
                id="live"
                checked={live}
                onCheckedChange={setLive}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="githubLink" className="text-right">
                GitHub Link
              </Label>
              <Input
                id="githubLink"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="col-span-3"
                placeholder="https://github.com/example"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technologies" className="text-right">
                Technologies
              </Label>
              <div className="col-span-3">
                <MultipleSelector
                  defaultOptions={technologies.map(tech => ({ value: tech.id, label: tech.name }))}
                  placeholder="Select technologies"
                  options={technologies.map(tech => ({ value: tech.id, label: tech.name }))}
                  value={selectedTechnologies.map(id => ({ value: id, label: technologies.find(t => t.id === id)?.name || '' }))}
                  onChange={(options: Option[]) => setSelectedTechnologies(options.map(option => option.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                Order
              </Label>
              <Input
                id="order"
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className={`col-span-3 ${errors.order ? 'border-red-500' : ''}`}
              />
              {errors.order && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.order}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Update Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}