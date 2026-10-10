import { useEffect, useState } from "react";
import type { Superstar } from "../types";

export default function RosterTable() {
  const [superstars, setSuperstars] = useState<Superstar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/roster/superstars")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }
            return res.json();
        })
        .then(setSuperstars)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading roster...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Overall</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {superstars.map((superstar) => (
          <tr key={superstar.id}>
            <td>{superstar.name}</td>
            <td>{superstar.overall}</td>
            <td>{superstar.gender}</td>
          </tr>
        ))}
      </tbody>
    </table> 
  );
}
