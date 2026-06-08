import pg from "pg";
const CONN =
  "postgresql://neondb_owner:npg_wBlc2pHCb5tK@ep-aged-truth-ao1j9m9f.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const c = new pg.Client({ connectionString: CONN, ssl: { rejectUnauthorized: false } });
await c.connect();

const tables = ["cabins", "bookings", "guests", "settings"];

// Royal Stay is an internal STAFF dashboard: every logged-in employee shares the
// same data (no per-user ownership). So the policy is "any authenticated user
// has full access". Anonymous role has no table grants, so it stays locked out.
for (const t of tables) {
  await c.query(`ALTER TABLE public.${t} ENABLE ROW LEVEL SECURITY;`);
  await c.query(`DROP POLICY IF EXISTS "authenticated_full_access" ON public.${t};`);
  await c.query(`
    CREATE POLICY "authenticated_full_access" ON public.${t}
      FOR ALL TO authenticated
      USING (true) WITH CHECK (true);
  `);
  console.log(`RLS enabled + policy created on public.${t}`);
}

console.log("\nVerification:");
const r = await c.query(`
  SELECT c.relname AS tbl, c.relrowsecurity AS rls,
         p.policyname, p.cmd, p.roles::text AS roles
  FROM pg_class c
  LEFT JOIN pg_policies p ON p.schemaname='public' AND p.tablename=c.relname
  WHERE c.relnamespace='public'::regnamespace AND c.relkind='r'
  ORDER BY c.relname;`);
console.table(r.rows);

await c.end();
