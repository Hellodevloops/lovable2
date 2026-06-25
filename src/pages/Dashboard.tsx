import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Trash2, Download } from "lucide-react";
import { apiClient, API_BASE_URL } from "@/lib/apiClient";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ================= TYPES ================= */

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  ip_address: string;
  browser: string;
  os: string;
  device_type: string;
  screen_resolution: string;
  language: string;
  timezone: string;
  referrer: string;
  user_agent: string;
  created_at: string;
};

type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  current_role: string;
  message: string;
  resume: string;
  created_at: string;
};

type ContactsResponse = {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
};

const PAGE_SIZE = 10;

type PaginationFooterProps = {
  page: number;
  totalPages: number;
  totalRecords: number;
  onPrevious: () => void;
  onNext: () => void;
};

const PaginationFooter = ({
  page,
  totalPages,
  totalRecords,
  onPrevious,
  onNext,
}: PaginationFooterProps) => (
  <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
    <span>
      Page {page} of {totalPages} • {totalRecords}{" "}
      {totalRecords === 1 ? "record" : "records"}
    </span>
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={onPrevious}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  </div>
);

/* ================= COMPONENT ================= */

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [deviceType, setDeviceType] = useState<string>("all");
  const [contactPage, setContactPage] = useState(1);
  const [candidatePage, setCandidatePage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCandidateDetailsOpen, setIsCandidateDetailsOpen] = useState(false);

  const queryClient = useQueryClient();

  /* ================= CONTACT QUERY ================= */

  const { data = [], isLoading } = useQuery({
  queryKey: ["contacts"],
  queryFn: async () => {
    try {
      const response = await apiClient.get("/contacts");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Contacts API error:", error);
      return [];
    }
  },
});

  /* ================= CANDIDATE QUERY ================= */

  const {
  data: candidateData = [],
  isLoading: isCandidateLoading,
} = useQuery({
  queryKey: ["candidates"],
  queryFn: async () => {
    try {
      const res = await apiClient.get("/candidates");
      return res.data || [];
    } catch (error) {
      console.error("Candidate API error:", error);
      return []; // 👈 prevent crash
    }
  },
});

  /* ================= DELETE ================= */
/* ================= DELETE CONTACT ================= */
const deleteContactMutation = useMutation({
  mutationFn: async (id: number) => {
    await apiClient.delete(`/contacts/${id}`);
  },
  onSuccess: () => {
    toast.success("Contact deleted.");
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
  },
  onError: () => {
    toast.error("Failed to delete contact.");
  },
});

/* ================= DELETE CANDIDATE ================= */
const deleteCandidateMutation = useMutation({
  mutationFn: async (id: number) => {
    await apiClient.delete(`/candidates/${id}`);
  },
  onSuccess: () => {
    toast.success("Candidate deleted.");
    queryClient.invalidateQueries({ queryKey: ["candidates"] });
  },
  onError: () => {
    toast.error("Failed to delete candidate.");
  },
});

  /* ================= FUNCTIONS ================= */

  const truncateMessage = (text: string, max = 40) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max)}...` : text;
  };

  const filteredContacts = (Array.isArray(data) ? data : []).filter((c) => {
    const matchesSearch =
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase());

    const matchesDevice =
      deviceType === "all" ||
      c.device_type?.toLowerCase() === deviceType.toLowerCase();

    return matchesSearch && matchesDevice;
  });

  const totalContactRecords = filteredContacts.length;
  const totalContactPages = Math.max(1, Math.ceil(totalContactRecords / PAGE_SIZE));
  const safeContactPage = Math.min(contactPage, totalContactPages);
  const paginatedContacts = filteredContacts.slice(
    (safeContactPage - 1) * PAGE_SIZE,
    safeContactPage * PAGE_SIZE
  );

  const totalCandidateRecords = candidateData.length;
  const totalCandidatePages = Math.max(1, Math.ceil(totalCandidateRecords / PAGE_SIZE));
  const safeCandidatePage = Math.min(candidatePage, totalCandidatePages);
  const paginatedCandidates = candidateData.slice(
    (safeCandidatePage - 1) * PAGE_SIZE,
    safeCandidatePage * PAGE_SIZE
  );

  useEffect(() => {
    if (contactPage > totalContactPages) {
      setContactPage(totalContactPages);
    }
  }, [contactPage, totalContactPages]);

  useEffect(() => {
    if (candidatePage > totalCandidatePages) {
      setCandidatePage(totalCandidatePages);
    }
  }, [candidatePage, totalCandidatePages]);

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsOpen(true);
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsCandidateDetailsOpen(true);
  };

  const handleDeleteContact = (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContactMutation.mutate(id);
    }
  };

  const handleDeleteCandidate = (id: number) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      deleteCandidateMutation.mutate(id);
    }
  };

  const getResumeFileName = (resumePath: string) => {
    const basename = resumePath.split("/").pop() || "resume";
    return basename.replace(/^\d+-/, "");
  };

  const getResumeUrl = (resumePath: string) => {
    const normalized = resumePath.replace(/\\/g, "/");
    return `${API_BASE_URL}/${normalized.split("/").map(encodeURIComponent).join("/")}`;
  };

  const handleDownloadResume = async (candidateId: number, resumePath: string) => {
    const filename = getResumeFileName(resumePath);

    try {
      const response = await apiClient.get(`/candidates/${candidateId}/resume`, {
        responseType: "blob",
      });

      const blobUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      toast.error("Failed to download resume.");
    }
  };

  const handleExportCsv = () => {
      const rows = Array.isArray(data) ? data : [];
    if (!rows.length) {
      toast.message("No contacts to export.");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "IP Address",
      "Browser",
      "OS",
      "Device Type",
      "Screen",
      "Language",
      "Timezone",
      "Referrer",
      "Date Submitted",
    ];

    const csvRows = [
      headers.join(","),
      ...rows.map((c) =>
        [
          c.name,
          c.email,
          c.phone,
          c.subject,
          c.message.replace(/[\r\n]+/g, " "),
          c.ip_address,
          c.browser,
          c.os,
          c.device_type,
          c.screen_resolution,
          c.language,
          c.timezone,
          c.referrer,
          c.created_at,
        ]
          .map((v) => `"${(v || "").toString().replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            LuxeHire Admin Dashboard
          </h1>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("auth_user");
              window.location.href = "/login";
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contacts">Contact Requests</TabsTrigger>
            <TabsTrigger value="candidates">Candidate Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
        {/* ================= CONTACTS ================= */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Contact Requests</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* FILTER */}
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setContactPage(1);
                  }}
                />

                <Select
                  value={deviceType}
                  onValueChange={(value) => {
                    setDeviceType(value);
                    setContactPage(1);
                  }}
                >
                  <SelectTrigger className="min-w-[10.5rem] w-[10.5rem] shrink-0 [&>span]:line-clamp-none">
                    <SelectValue placeholder="All devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All devices</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleExportCsv}>Export CSV</Button>
            </div>

            {/* TABLE */}
            <div className="border rounded-md overflow-x-auto">
              {isLoading ? (
                <div className="p-6">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Device Type</TableHead>
                      <TableHead>Screen</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Timezone</TableHead>
                      <TableHead>Referrer</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {paginatedContacts.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="whitespace-nowrap">{c.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.email}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.phone}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.subject}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={c.message}>
                          {truncateMessage(c.message)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{c.ip_address || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.browser || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.os || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.device_type || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.screen_resolution || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.language || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">{c.timezone || "—"}</TableCell>
                        <TableCell className="max-w-[180px] truncate" title={c.referrer}>
                          {c.referrer ? truncateMessage(c.referrer, 30) : "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {new Date(c.created_at).toLocaleString()}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => handleViewDetails(c)}
                                    aria-label="View contact"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="destructive"
                                    className="h-8 w-8"
                                    onClick={() => handleDeleteContact(c.id)}
                                    aria-label="Delete contact"
                                    disabled={deleteContactMutation.isPending}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {!isLoading && (
                <PaginationFooter
                  page={safeContactPage}
                  totalPages={totalContactPages}
                  totalRecords={totalContactRecords}
                  onPrevious={() => setContactPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setContactPage((p) => Math.min(totalContactPages, p + 1))
                  }
                />
              )}
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="candidates">
        {/* ================= CANDIDATES ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Applications</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="border rounded-md overflow-x-auto">
              {isCandidateLoading ? (
                <div className="p-6">Loading candidates...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Resume</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {paginatedCandidates.map((c) => (
                      <TableRow key={c.id}>
                       <TableCell>{c.name}</TableCell>
                       <TableCell>{c.email}</TableCell>
                       <TableCell>{c.phone}</TableCell>
                       <TableCell>{c.current_role}</TableCell>
                       <TableCell>{c.message}</TableCell>

                       <TableCell>
                            {c.resume ? (
                              <a
                                href={getResumeUrl(c.resume)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline max-w-[180px] truncate block"
                                title={getResumeFileName(c.resume)}
                              >
                                {getResumeFileName(c.resume)}
                              </a>
                            ) : (
                              "—"
                            )}
                            </TableCell>

                   <TableCell>
                     {new Date(c.created_at).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() => handleViewCandidate(c)}
                                  aria-label="View candidate"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {c.resume && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => handleDownloadResume(c.id, c.resume)}
                                    aria-label="Download resume"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Download resume</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  className="h-8 w-8"
                                  onClick={() => handleDeleteCandidate(c.id)}
                                  aria-label="Delete candidate"
                                  disabled={deleteCandidateMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {!isCandidateLoading && (
                <PaginationFooter
                  page={safeCandidatePage}
                  totalPages={totalCandidatePages}
                  totalRecords={totalCandidateRecords}
                  onPrevious={() => setCandidatePage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setCandidatePage((p) => Math.min(totalCandidatePages, p + 1))
                  }
                />
              )}
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ================= DETAILS POPUP ================= */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Full contact information
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {selectedContact.name}</p>
              <p><span className="font-medium">Email:</span> {selectedContact.email}</p>
              <p><span className="font-medium">Phone:</span> {selectedContact.phone || "—"}</p>
              <p><span className="font-medium">Subject:</span> {selectedContact.subject || "—"}</p>
              <p><span className="font-medium">Message:</span> {selectedContact.message}</p>
              <p><span className="font-medium">IP Address:</span> {selectedContact.ip_address || "—"}</p>
              <p><span className="font-medium">Browser:</span> {selectedContact.browser || "—"}</p>
              <p><span className="font-medium">OS:</span> {selectedContact.os || "—"}</p>
              <p><span className="font-medium">Device Type:</span> {selectedContact.device_type || "—"}</p>
              <p><span className="font-medium">Screen:</span> {selectedContact.screen_resolution || "—"}</p>
              <p><span className="font-medium">Language:</span> {selectedContact.language || "—"}</p>
              <p><span className="font-medium">Timezone:</span> {selectedContact.timezone || "—"}</p>
              <p><span className="font-medium">Referrer:</span> {selectedContact.referrer || "—"}</p>
              <p><span className="font-medium">Date Submitted:</span> {new Date(selectedContact.created_at).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCandidateDetailsOpen} onOpenChange={setIsCandidateDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Candidate Details</DialogTitle>
            <DialogDescription>
              Full candidate application information
            </DialogDescription>
          </DialogHeader>

          {selectedCandidate && (
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {selectedCandidate.name}</p>
              <p><span className="font-medium">Email:</span> {selectedCandidate.email}</p>
              <p><span className="font-medium">Phone:</span> {selectedCandidate.phone || "—"}</p>
              <p><span className="font-medium">Role:</span> {selectedCandidate.current_role || "—"}</p>
              <p><span className="font-medium">Message:</span> {selectedCandidate.message || "—"}</p>
              <p>
                <span className="font-medium">Resume:</span>{" "}
                {selectedCandidate.resume ? (
                  <a
                    href={getResumeUrl(selectedCandidate.resume)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {getResumeFileName(selectedCandidate.resume)}
                  </a>
                ) : (
                  "—"
                )}
              </p>
              <p><span className="font-medium">Date Submitted:</span> {new Date(selectedCandidate.created_at).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;