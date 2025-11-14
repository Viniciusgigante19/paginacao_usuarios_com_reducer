import { useContext, useEffect } from "react";
import { ListUserContext } from "@app/js/React/providers/context/userContext";

export default function ListOfUsersComponent() {
  const context = useContext(ListUserContext);

  if (!context) {
    throw new Error("ListOfUsersComponent must be used within a UserProvider");
  }

  const { state, fetchUsers, dispatch } = context;
  const { users, loading, error, page, totalPages } = state;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch({ type: "SET_PAGE", payload: page + 1 });
      fetchUsers(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch({ type: "SET_PAGE", payload: page - 1 });
      fetchUsers(page - 1);
    }
  };

  if (loading) return <div className="text-center mt-4">Carregando usuários...</div>;
  if (error) return <div className="alert alert-danger mt-4">Erro ao carregar usuários: {error}</div>;
  if (!users || users.length === 0) return <div className="text-center mt-4">Nenhum usuário encontrado.</div>;

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100" style={{ transition: "all 0.2s", cursor: "pointer" }} 
                 onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0.5rem 1rem rgba(0,0,0,0.15)"}
                 onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0.125rem 0.25rem rgba(0,0,0,0.075)"}>
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text text-muted">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="btn btn-primary"
        >
          &laquo; Página anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="btn btn-primary"
        >
          Próxima página &raquo;
        </button>
      </div>
    </div>
  );
}
