"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    company: "",
    title: "Senior Software Engineer",
    location: "Berlin",
    workplaceType: "On site",
    experience: "5",
    description: "",
    url: "",
    pricingPlan: "standard",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const pricingPlans = [
    {
      id: "standard",
      name: "Standard",
      price: "$99",
      description: "Get your job listed in our job board and reach 300k+ developers each month.",
      features: ["Job listing in job board", "Reach 300k+ developers"],
    },
    {
      id: "featured",
      name: "Featured",
      price: "$299",
      description: "Get prime placement in the featured section at the top for maximum visibility.",
      features: ["Everything in Standard", "Featured placement", "Top of listings"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$999",
      description: "Get maximum exposure with featured placement, email promotion, social media promotion, and homepage spotlight.",
      features: [
        "Everything in Featured",
        "Email promotion to developer network",
        "Social media promotion",
        "Homepage spotlight",
      ],
    },
  ];

  const totalPrice = pricingPlans.find((p) => p.id === formData.pricingPlan)?.price || "$99";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight">Create a new job listing</h1>
          <p className="text-muted-foreground">
            Post your job opportunity and reach our community of digital analytics engineers
          </p>
        </div>

        <form className="space-y-8">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Provide information about the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <div className="flex gap-2">
                  <Select value={formData.company} onValueChange={(value) => handleSelectChange("company", value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Add new company</SelectItem>
                      {/* TODO: Load companies */}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" className="rounded-full">
                    Add company
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Job listing title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Digital Analytics Engineer"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Berlin, Remote, New York"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workplaceType">Workplace Type</Label>
                <Select
                  value={formData.workplaceType}
                  onValueChange={(value) => handleSelectChange("workplaceType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On site">On site</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="experience">Years of experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Job listing description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Describe the role, requirements, and what makes it great..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">Link to job page</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://your-company.com/careers/job-id"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Plans</CardTitle>
              <CardDescription>Choose a plan to maximize your job listing visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {pricingPlans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => handleSelectChange("pricingPlan", plan.id)}
                    className={`rounded-lg border p-6 text-left transition-all ${
                      formData.pricingPlan === plan.id
                        ? "border-foreground bg-card"
                        : "border-border/50 bg-card/50 hover:border-border/80"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">{plan.name}</h3>
                      {formData.pricingPlan === plan.id && (
                        <div className="h-2 w-2 rounded-full bg-foreground" />
                      )}
                    </div>
                    <p className="mb-2 text-2xl font-semibold">{plan.price}</p>
                    <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-6">
            <div>
              <p className="text-sm font-medium">Total</p>
              <p className="text-2xl font-semibold">{totalPrice}</p>
            </div>
            <Button type="submit" className="rounded-full" size="lg">
              Submit & Pay ({totalPrice})
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

