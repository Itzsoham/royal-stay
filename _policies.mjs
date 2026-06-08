import pg from "pg";
const CONN =
  "postgresql://neondb_owner:npg_wBlc2pHCb5tK@ep-aged-truth-ao1j9m9f.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const c = new pg.Client({ connectionString: CONN, ssl: { rejectUnauthorized: false } });
await c.connect();
for (const t of ["cabins", "bookings", "guests", "settings"]) {
  await c.query(`DROP POLICY IF EXISTS "authenticated_full_access" ON public.${t};`);
  await c.query(`CREATE POLICY "authenticated_full_access" ON public.${t}
                   FOR ALL TO authenticated USING (true) WITH CHECK (true);`);
  console.log(`policy created on public.${t}`);
}
const r = await c.query(`
  SELECT tablename, policyname, cmd, roles::text AS roles
  FROM pg_policies WHERE schemaname='public' ORDER BY tablename;`);
console.table(r.rows);
await c.end();
