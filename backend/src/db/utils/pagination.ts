/**
 * Calcola i metadati di paginazione dati page, pageSize e totalItems
 * Funzione pura: nessuna dipendenza da DB o altri moduli
 * 
 * Nota: quando totalItems = 0, totalPages = 1 (pagina vuota) per UX migliore
 */
export function buildPagination(page: number, pageSize: number, totalItems: number) {
  // Se non ci sono elementi, restituiamo comunque 1 pagina (pagina vuota)
  // per evitare confusione nell'UI ("pagina 1 di 1" invece di "pagina 1 di 0")
  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
