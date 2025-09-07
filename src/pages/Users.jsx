// src/pages/Users.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";

let supabase = null;
try {
  supabase = require("../services/supabase").supabase || null;
} catch {
  // Supabase client not available; fallback mode
}

const Wrap = styled.main`
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: clamp(1.3rem, 1.4vw + 1rem, 1.8rem);
  margin: 0 0 1rem;
`;

const Card = styled.section`
  background: var(--color-grey-0, #fff);
  border: 1px solid var(--color-grey-100, #eceff3);
  border-radius: 12px;
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 0.75rem 0.8rem;
    border-bottom: 1px solid var(--color-grey-100, #eceff3);
    text-align: left;
  }
  th {
    font-weight: 700;
    color: var(--color-grey-700, #334155);
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #0f5132;
  background: #d1e7dd;
  border: 1px solid #badbcc;
`;

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from("users")
            .select("id, fullName, email, role, created_at")
            .order("created_at", { ascending: false });

          if (error) throw error;
          if (!ignore) setRows(Array.isArray(data) ? data : []);
        } else {
          if (!ignore) {
            setRows([
              {
                id: "demo-1",
                fullName: "Demo Admin",
                email: "admin@demo.dev",
                role: "admin",
                created_at: new Date().toISOString(),
              },
            ]);
          }
        }
      } catch {
        if (!ignore) setRows([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Wrap>
      <Title>Users</Title>
      <Card>
        {loading ? (
          <p style={{ color: "var(--color-grey-600)" }}>Loading users…</p>
        ) : rows.length === 0 ? (
          <p style={{ color: "var(--color-grey-600)" }}>
            No users found. Create a <code>users</code> table with{" "}
            <code>fullName</code>, <code>email</code>, <code>role</code>,{" "}
            <code>created_at</code>.
          </p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Full name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td>{u.fullName || "—"}</td>
                  <td>{u.email || "—"}</td>
                  <td>
                    <Badge>{u.role || "staff"}</Badge>
                  </td>
                  <td>
                    {u.created_at
                      ? new Date(u.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Wrap>
  );
}
