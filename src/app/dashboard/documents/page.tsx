import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentsPage() {
  return (
    <main className="flex flex-1 flex-col p-8 lg:p-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E3A5F]">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Section à venir.</p>
        </CardContent>
      </Card>
    </main>
  );
}
