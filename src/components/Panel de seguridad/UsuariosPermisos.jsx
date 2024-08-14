export const UsuariosPermisos = ({ users, onUserClick }) => {
    if (!Array.isArray(users)) {
        return <p>Error: No se pudo cargar la lista de usuarios.</p>;
    }

    if (users.length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} onClick={() => onUserClick(user)}>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.rol.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
