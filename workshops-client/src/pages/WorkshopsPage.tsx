import { useEffect, useState } from "react";
import { getWorkshops } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Workshop {
  id: number;
  title: string;
  description: string;
  capacity: number;
  availableSlots: number;
}

export function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    getWorkshops()
      .then(setWorkshops)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Lista de Talleres
      </h1>
      <Table>
        <TableCaption>Listado de talleres disponibles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Cupos</TableHead>
            <TableHead>Disponibles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workshops.map((workshop) => (
            <TableRow key={workshop.id}>
              <TableCell>{workshop.id}</TableCell>
              <TableCell>{workshop.title}</TableCell>
              <TableCell className="max-w-xs truncate">
                {workshop.description}
              </TableCell>
              <TableCell>{workshop.capacity}</TableCell>
              <TableCell>{workshop.availableSlots}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
