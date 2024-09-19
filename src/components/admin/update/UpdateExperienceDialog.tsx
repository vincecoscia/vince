import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { api } from "@/utils/api";
import { Pencil } from 'lucide-react';
import { Technology, Experience } from "@prisma/client";

interface UpdateExperienceDialogProps {
  experience: Experience & { technologies: Technology[] };
  technologies: Technology[];
  onUpdate: () => void;
  children: React.ReactNode; // Add this line
}

export function UpdateExperienceDialog({ experience, technologies, onUpdate, children }: UpdateExperienceDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(experience.title);
  const [company, setCompany] = useState(experience.company);
  const [period, setPeriod] = useState(experience.period);
  const [description, setDescription] = useState(experience.description || '');
  const [order, setOrder] = useState(experience.order);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    experience.technologies.map(tech => tech.id)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();
  const utils = api.useUtils();
  const updateExperienceMutation = api.experience.update.useMutation();

  useEffect(() => {
    if (open) {
      setTitle(experience.title);
      setCompany(experience.company);
      setPeriod(experience.period);
      setDescription(experience.description || '');
      setOrder(experience.order);
      setSelectedTechnologies(experience.technologies.map(tech => tech.id));
    }
  }, [open, experience]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = 'Title is required';
    if (!company) newErrors.company = 'Company is required';
    if (!period) newErrors.period = 'Period is required';
    if (!description) newErrors.description = 'Description is required';
    if (!order) newErrors.order = 'Order is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await updateExperienceMutation.mutateAsync({
          id: experience.id,
          title,
          company,
          period,
          description,
          technologies: selectedTechnologies,
          order,
        });
        toast({
          title: "Experience updated successfully",
          description: "Your experience has been updated.",
        });
        utils.experience.getAll.invalidate();
        setOpen(false);
        onUpdate();
      } catch (error) {
        toast({
          title: "Error updating experience",
          description: "There was a problem updating your experience. Please try again.",
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
          <DialogTitle>Update Experience</DialogTitle>
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
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`col-span-3 ${errors.company ? 'border-red-500' : ''}`}
              />
              {errors.company && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.company}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <Input
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={`col-span-3 ${errors.period ? 'border-red-500' : ''}`}
                placeholder="e.g., Jan 2020 - Present"
              />
              {errors.period && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.period}</p>}
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
              {errors.technologies && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.technologies}</p>}
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
            <Button type="submit">Update Experience</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}