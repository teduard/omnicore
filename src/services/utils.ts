export const dbQuery = <T>(db, sql: string, params?: any): T[] => {
  const stmt = db.prepare(sql);

  if (params) stmt.bind(params);

  const rows: T[] = [];

  while (stmt.step()) {
    rows.push(stmt.getAsObject() as T);
  }

  stmt.free();
  return rows;
};

export const dbExecute = (
  db,
  sql: string,
  params?: unknown[] | Record<string, unknown>
): { changes: number; lastInsertRowId: number } => {
  const stmt = db.prepare(sql);

  if (params) stmt.bind(params);

  stmt.step(); // execute

  const result = {
    changes: db.getRowsModified(),
    lastInsertRowId: db.exec(
      "SELECT last_insert_rowid() as id"
    )[0]?.values[0]?.[0] as number
  };

  stmt.free();

  return result;
}