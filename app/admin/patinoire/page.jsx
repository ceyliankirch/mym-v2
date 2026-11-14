import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Soirée patinoire" };

const C = { teal: "#114C5A", yellow: "#FFC801", arctic: "#F1F6F4" };
const th = { textAlign: "left", padding: "12px 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#8aa" };
const td = { padding: "12px 16px", fontSize: 14, borderTop: `1px solid ${C.arctic}` };

export default async function AdminPatinoirePage() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "ADMINISTRATEUR") redirect("/");

  const inscriptions = await prisma.patinoireInscription.findMany({ orderBy: { createdAt: "desc" } });
  const totalPatineurs = inscriptions.reduce((n, i) => n + i.patineurs, 0);

  return (
    <div style={{ background: C.arctic, minHeight: "70vh", padding: "48px 24px", color: C.teal }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <a href="/admin" style={{ fontSize: 13, fontWeight: 700, color: C.teal, textDecoration: "none" }}>← Retour à l&apos;admin</a>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: "12px 0 8px" }}>Soirée patinoire · 11 décembre</h1>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "20px 0 28px" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "18px 28px" }}>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 900 }}>{totalPatineurs}</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#8aa" }}>patineurs au total</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "18px 28px" }}>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 900 }}>{inscriptions.length}</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#8aa" }}>inscriptions</p>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th style={th}>Nom</th><th style={th}>Prénom</th><th style={th}>Email</th><th style={th}>Patineurs</th><th style={th}>Date</th></tr>
            </thead>
            <tbody>
              {inscriptions.length === 0 && (
                <tr><td colSpan={5} style={{ ...td, textAlign: "center", color: "#8aa" }}>Aucune inscription pour le moment.</td></tr>
              )}
              {inscriptions.map((i) => (
                <tr key={i.id}>
                  <td style={{ ...td, fontWeight: 800 }}>{i.nom}</td>
                  <td style={td}>{i.prenom}</td>
                  <td style={td}>{i.email || "—"}</td>
                  <td style={{ ...td, fontWeight: 800 }}>{i.patineurs}</td>
                  <td style={td}>{i.createdAt.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
