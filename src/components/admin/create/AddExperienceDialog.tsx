/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import MultipleSelector, { type Option } from '@/components/ui/multiple-selector';
import { api } from "@/utils/api";
import { Plus } from 'lucide-react';
import { type Technology } from "@prisma/client";


interface AddExperienceDialogProps {
  technologies: Technology[];
}

export function AddExperienceDialog({ technologies }: AddExperienceDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState(0);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const utils = api.useUtils();

  const { toast } = useToast();
  const addExperienceMutation = api.experience.create.useMutation();

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
        await addExperienceMutation.mutateAsync({
          title,
          company,
          period,
          description,
          technologies: selectedTechnologies,
          order: order,
        });
        toast({
          title: "Experience added successfully",
          description: "Your new experience has been added to your profile.",
        });
        utils.experience.getAll.invalidate();
        setOpen(false);
        // Reset form fields
        setTitle('');
        setCompany('');
        setPeriod('');
        setDescription('');
        setSelectedTechnologies([]);
        setOrder(0);
      } catch (error) {
        toast({
          title: "Error adding experience",
          description: "There was a problem adding your experience. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add New Experience
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Experience</DialogTitle>
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
                onChange={(options: Option[]) => setSelectedTechnologies(options.map(option => option.value))}
              />
              {errors.technologies && <p className="col-span-3 col-start-2 text-red-500 text-sm">{errors.technologies}</p>}
              {technologies.length === 0 && <p className="col-span-3 col-start-2 text-red-500 text-sm">No technologies found</p>}
              </div>
              <Label htmlFor="order" className="text-right">
                Order
              </Label>
              <Input
                id="order"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className={`col-span-3 ${errors.order ? 'border-red-500' : ''}`}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Experience</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}