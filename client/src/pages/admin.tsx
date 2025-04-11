import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Download, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Resume {
  id: number;
  filename: string;
  path: string;
  uploadedAt: Date;
}

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Load resumes on page load
  useEffect(() => {
    fetchResumes();
  }, []);
  
  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/resume/all");
      
      if (!response.ok) {
        throw new Error("Failed to fetch resumes");
      }
      
      const data = await response.json();
      if (data.success) {
        setResumes(data.resumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast({
        title: "Error",
        description: "Could not load resumes. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Check if file is PDF
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid file",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append("resume", file);
      
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Resume uploaded successfully!",
        });
        
        // Reset form
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        
        // Refresh resume list
        fetchResumes();
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Could not upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this resume?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete resume");
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Resume deleted successfully!",
        });
        
        // Refresh resume list
        fetchResumes();
      } else {
        throw new Error(data.message || "Deletion failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Deletion failed",
        description: error instanceof Error ? error.message : "Could not delete resume. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Resume Management</h1>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Upload form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload New Resume</CardTitle>
            <CardDescription>
              Upload a PDF file of your latest resume. Maximum file size is 10MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="resume">Resume File (PDF only)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              
              {file && (
                <div className="text-sm">
                  Selected file: <span className="font-medium">{file.name}</span> ({Math.round(file.size / 1024)} KB)
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Resume list */}
        <Card>
          <CardHeader>
            <CardTitle>Resume History</CardTitle>
            <CardDescription>
              View and manage your uploaded resumes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No resumes uploaded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div key={resume.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium truncate">{resume.filename}</h3>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {formatDate(resume.uploadedAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`${resume.path}?key=abhay-portfolio`, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(resume.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}