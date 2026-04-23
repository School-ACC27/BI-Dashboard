import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Customer } from "../data/crm-data";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "aware":
      case "awareness":
        return "secondary";
      case "considering":
        return "outline";
      case "purchasing":
      case "purchase":
        return "default";
      case "retained":
      case "retention":
        return "default";
      case "advocate":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getActionColor = (action: string) => {
    if (action.toLowerCase().includes("purchased")) return "default";
    if (action.toLowerCase().includes("declined")) return "destructive";
    return "secondary";
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Round</TableHead>
              <TableHead>Customer Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Current Stage</TableHead>
              <TableHead>Customer Action</TableHead>
              <TableHead>Customer End Stage</TableHead>
              <TableHead>NPS</TableHead>
              <TableHead>Retained</TableHead>
              <TableHead>Converted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.round}</TableCell>
                  <TableCell>{customer.customerNumber}</TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.product}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.currentStage}</TableCell>
                  <TableCell> {customer.customerAction}
                  </TableCell>
                  <TableCell>
                      {customer.endStage}
                  </TableCell>
                  <TableCell>
                    {customer.npsScore !== null ? (
                      <span className={customer.npsScore >= 4 ? "text-green-600 font-semibold" : ""}>
                        {customer.npsScore}/5
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                      {customer.retained}
                  </TableCell>
                  <TableCell>
                      {customer.converted}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
