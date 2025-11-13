// listOfUsersComponent.tsx
import { useContext } from "react";
import { ListUserContext } from "@app/js/React/providers/context/userContext";

export default function ListOfUsersComponent() {
  const context = useContext(ListUserContext);

  if (!context) {
    throw new Error("ListOfUsersComponent must be used within a UserProvider");
  }

  const { users, loading, error } = context;

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários: {error}</p>;
  if (!users || users.length === 0) return <p>Nenhum usuário encontrado.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
