import { createColumnsRegistrazioni, type Registrazioni } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useRegistrazioniSuspense } from "@/hooks/use-registrazioni";
import type { RegistrazioniCopieQuery } from "@shared/validation";

export interface VisualizzaRegistrazioniContentProps {
  query: RegistrazioniCopieQuery;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: string) => void;
  onView: (registrazione: Registrazioni) => void;
  onEdit: (registrazione: Registrazioni) => void;
  onDelete: (registrazione: Registrazioni) => void;
}

/** Contenuto che sospende fino al caricamento delle registrazioni; da usare dentro <Suspense>. */
export function VisualizzaRegistrazioniContent({
  query,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
}: VisualizzaRegistrazioniContentProps) {
  const { data } = useRegistrazioniSuspense(query);
  const columns = createColumnsRegistrazioni({ onView, onEdit, onDelete });
  const tableData: Registrazioni[] = data.data.map((d) => ({
    id: d.id,
    docenteId: d.docenteId,
    copieEffettuate: d.copieEffettuate,
    istitutoId: d.istitutoId,
    utenteId: d.utenteId,
    note: d.note,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    docenteNome: d.docenteNome,
    docenteCognome: d.docenteCognome,
    utenteUsername: d.utenteUsername,
    utenteEmail: d.utenteEmail,
  }));

  return (
    <div className="w-full mt-4">
      <DataTable
        columns={columns}
        data={tableData}
        tableType="registrazioni"
        pagination={data.pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
