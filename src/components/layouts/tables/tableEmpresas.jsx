import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TableEmpresas() {
  const empresas = [
    { id: 1, nombre: "Empresa 1" },
    { id: 2, nombre: "Empresa 2" },
    { id: 3, nombre: "Empresa 3" },
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow key={empresa.id}>
              <TableCell className="font-medium">{empresa.nombre}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive">Dar de baja</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="2" className="text-right">
              <Button variant="primary">Agregar empresa</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default TableEmpresas;