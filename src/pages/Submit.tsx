
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type NewsArticle } from "@/services/newsService";
import NewsSearch from "@/components/NewsSearch";

const Submit = () => {
  const [formData, setFormData] = useState({
    title: "",
    source: "",
    category: "politics",
    description: "",
    assessment: "" as "true" | "false" | "uncertain" | "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleAssessmentChange = (value: "true" | "false" | "uncertain") => {
    setFormData(prev => ({
      ...prev,
      assessment: value
    }));
  };

  const handleSelectArticle = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      source: article.url,
      category: "politics", // Default category, user can change
      description: article.description || article.content || "",
      assessment: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.assessment) {
      toast({
        title: "Assessment required",
        description: "Please select your initial assessment of this claim.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Claim submitted",
        description: "Your claim has been submitted for verification.",
      });
      // Reset form
      setFormData({
        title: "",
        source: "",
        category: "politics",
        description: "",
        assessment: "",
      });
    }, 1500);
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Submit a Claim</h1>
        <p className="text-muted-foreground mb-6">
          Submit a news claim for the community to verify. Earn points when your submission gets verified.
        </p>
        
        <div className="mb-6">
          <NewsSearch onSelectArticle={handleSelectArticle} />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Claim Title
            </label>
            <Input
              id="title"
              placeholder="Enter a concise title for the claim"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="source" className="text-sm font-medium">
              Source URL
            </label>
            <Input
              id="source"
              type="url"
              placeholder="https://example.com/article"
              required
              value={formData.source}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Category
            </label>
            <Select value={formData.category} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="health">Health & Medicine</SelectItem>
                <SelectItem value="science">Science & Technology</SelectItem>
                <SelectItem value="environment">Environment & Climate</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Provide details about the claim and why it needs verification"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Your Initial Assessment
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className={`flex-1 ${formData.assessment === "true" 
                  ? "bg-green-500/10 border-green-500" 
                  : "border-green-500 hover:bg-green-500/10"}`}
                onClick={() => handleAssessmentChange("true")}
              >
                Likely True
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`flex-1 ${formData.assessment === "uncertain" 
                  ? "bg-yellow-500/10 border-yellow-500" 
                  : "border-yellow-500 hover:bg-yellow-500/10"}`}
                onClick={() => handleAssessmentChange("uncertain")}
              >
                Uncertain
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`flex-1 ${formData.assessment === "false" 
                  ? "bg-red-500/10 border-red-500" 
                  : "border-red-500 hover:bg-red-500/10"}`}
                onClick={() => handleAssessmentChange("false")}
              >
                Likely False
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Submit;
