import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

type ContactsResponse = {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [deviceType, setDeviceType] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ContactsResponse>({
    queryKey: ["contacts", { search, deviceType, page, limit }],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, limit };
      if (search) params.search = search;
      if (deviceType !== "all") params.deviceType = deviceType;
      const response = await apiClient.get("/contacts", { params });
      return response.data;
    },
  });

  const deleteMutation = useMutation({
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

  const total = data?.total || 0;
  const totalPages = total ? Math.ceil(total / limit) : 1;

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsOpen(true);
  };

  const handleExportCsv = () => {
    const rows = data?.data || [];
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
          .join(","),
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

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">LuxeHire Admin Dashboard</h1>
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

      <div className="container mx-auto px-4 py-6 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Contact Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 gap-2">
                <Input
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="max-w-xs"
                />
                <Select
                  value={deviceType}
                  onValueChange={(value) => {
                    setDeviceType(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Device type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All devices</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={handleExportCsv}>
                Export CSV
              </Button>
            </div>

            <div className="border rounded-md">
              {isLoading ? (
                <div className="p-6 text-sm text-muted-foreground">Loading contacts...</div>
              ) : !data?.data?.length ? (
                <div className="p-6 text-sm text-muted-foreground">No contacts found.</div>
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell className="max-w-xs truncate" title={contact.message}>
                          {contact.message}
                        </TableCell>
                        <TableCell>{contact.ip_address}</TableCell>
                        <TableCell>{contact.browser}</TableCell>
                        <TableCell>{contact.os}</TableCell>
                        <TableCell>{contact.device_type}</TableCell>
                        <TableCell>{contact.screen_resolution}</TableCell>
                        <TableCell>{contact.language}</TableCell>
                        <TableCell>{contact.timezone}</TableCell>
                        <TableCell className="max-w-xs truncate" title={contact.referrer}>
                          {contact.referrer}
                        </TableCell>
                        <TableCell>{new Date(contact.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="xs" onClick={() => handleViewDetails(contact)}>
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="xs"
                            onClick={() => deleteMutation.mutate(contact.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Page {page} of {totalPages} • {total} records
              </span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Visitor Details</DialogTitle>
            <DialogDescription>Full submission and visitor metadata.</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Name:</span>
                <span>{selectedContact.name}</span>
                <span className="font-medium">Email:</span>
                <span>{selectedContact.email}</span>
                <span className="font-medium">Phone:</span>
                <span>{selectedContact.phone}</span>
                <span className="font-medium">Subject:</span>
                <span>{selectedContact.subject}</span>
                <span className="font-medium">IP Address:</span>
                <span>{selectedContact.ip_address}</span>
                <span className="font-medium">Browser:</span>
                <span>{selectedContact.browser}</span>
                <span className="font-medium">OS:</span>
                <span>{selectedContact.os}</span>
                <span className="font-medium">Device Type:</span>
                <span>{selectedContact.device_type}</span>
                <span className="font-medium">Screen:</span>
                <span>{selectedContact.screen_resolution}</span>
                <span className="font-medium">Language:</span>
                <span>{selectedContact.language}</span>
                <span className="font-medium">Timezone:</span>
                <span>{selectedContact.timezone}</span>
                <span className="font-medium">Referrer:</span>
                <span className="truncate" title={selectedContact.referrer}>
                  {selectedContact.referrer}
                </span>
                <span className="font-medium">Submitted:</span>
                <span>{new Date(selectedContact.created_at).toLocaleString()}</span>
              </div>
              <div className="mt-4">
                <div className="font-medium mb-1">Message</div>
                <div className="rounded-md border bg-muted/40 p-2 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              <div className="mt-4">
                <div className="font-medium mb-1">User Agent</div>
                <div className="rounded-md border bg-muted/40 p-2 text-xs break-all">
                  {selectedContact.user_agent}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

