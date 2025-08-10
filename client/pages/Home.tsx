import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Heart,
  Settings,
  User,
  Bell,
} from "lucide-react";
import { mockJobs, mockUser } from "@/data/mockJobs";
import { Job } from "@shared/jobs";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [savedJobs, setSavedJobs] = useState<string[]>(mockUser.savedJobs);
  const navigate = useNavigate();

  const filteredJobs = useMemo(() => {
    let jobs = mockJobs;

    if (searchQuery) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    if (selectedFilter !== "all") {
      jobs = jobs.filter((job) => {
        switch (selectedFilter) {
          case "remote":
            return job.isRemote;
          case "fulltime":
            return job.type === "Full-time";
          case "saved":
            return savedJobs.includes(job.id);
          default:
            return true;
        }
      });
    }

    return jobs;
  }, [searchQuery, selectedFilter, savedJobs]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const formatSalary = (job: Job) => {
    if (!job.salary) return "Competitive";
    return `$${job.salary.min / 1000}k - $${job.salary.max / 1000}k`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black relative">
      {/* Dual Gradient Overlay Background - Light Mode Only */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      {/* Midnight Mist - Dark Mode Only */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
        }}
      />
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img

                  alt="JobsFeed Logo"
                  className="w-10 h-10 mr-3 rounded-full"
                />
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  JobsFeed
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <ModeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Welcome back, {mockUser.name}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find your perfect job from {mockJobs.length} available
              opportunities
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                All Jobs
              </Button>
              <Button
                variant={selectedFilter === "remote" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("remote")}
              >
                Remote
              </Button>
              <Button
                variant={selectedFilter === "fulltime" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("fulltime")}
              >
                Full-time
              </Button>
              <Button
                variant={selectedFilter === "saved" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("saved")}
              >
                Saved ({savedJobs.length})
              </Button>
            </div>
          </div>

          {/* Job Results */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {filteredJobs.length} Jobs Found
              </h3>
            </div>

            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {job.company.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {job.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                          {job.company}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {formatSalary(job)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTimeAgo(job.postedAt)}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.type}</Badge>
                          <Badge variant="outline">{job.experienceLevel}</Badge>
                          {job.isRemote && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                      className={
                        savedJobs.includes(job.id)
                          ? "text-blue-600"
                          : "text-gray-400"
                      }
                    >
                      <Bookmark
                        className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 5} more
                      </Badge>
                    )}
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {job.companySize} • {job.industry}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filters to find more
                  opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
