import { useEffect, useState } from 'react';
import { UsuariosPermisos } from './UsuariosPermisos';

export const PanelPermisos = () => {
    const [permissions, setPermissions] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/Usuarios/user/All');
            if (response.ok) {
                const data = await response.json();
                console.log('Usuarios', data);
    
                // Asegúrate de que `data` es un array
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Datos de usuarios no son un array', data);
                    setUsers([]); // Puedes establecerlo como un array vacío para evitar errores
                }
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const fetchPermissions = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/permiso/role/getPermissions');
            if (response.ok) {
                const data = await response.json();
                console.log('Permisos', data);
                setPermissions(data);
            } else {
                console.error('Failed to fetch permissions');
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };

    useEffect(() => {
        fetchPermissions();
        fetchUsers();
    }, []);

    const handleClick = (user) => {
        setSelectedUser(user);
    };

    const handlePermissionAdd = async (permission, user) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/permiso/role/addPermission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_user: user.id, id_permiso: permission.id }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Actualiza el estado del usuario seleccionado
                setSelectedUser(prevState => ({
                    ...prevState,
                    rol: {
                        ...prevState.rol,
                        permisos: [...prevState.rol.permisos, permission.nombre_permiso],
                    },
                }));
            } else {
                console.error("Error adding permission:", await response.json());
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handlePermissionRemove = async (permission, user) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/permiso/role/removePermission', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_user: user.id, id_permiso: permission.id }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Actualiza el estado del usuario seleccionado
                setSelectedUser(prevState => ({
                    ...prevState,
                    rol: {
                        ...prevState.rol,
                        permisos: prevState.rol.permisos.filter(p => p !== permission.nombre_permiso),
                    },
                }));
            } else {
                console.error("Error removing permission:", await response.json());
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleCheckboxChange = (permission, user) => {
        const userHasPermission = selectedUser.rol.permisos.includes(permission.nombre_permiso);
        if (userHasPermission) {
            handlePermissionRemove(permission, user);
        } else {
            handlePermissionAdd(permission, user);
        }
    };

    return (
        <div>
            {users.length === 0 ? <p>Cargando usuarios...</p> : <UsuariosPermisos users={users} onUserClick={handleClick} />}
            

            {selectedUser && (
                <div>
                    <h2>Permisos de {selectedUser.full_name}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Permiso</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((permission, index) => {
                                const userHasPermission = selectedUser.rol.permisos.includes(permission.nombre_permiso);
                                return (
                                    <tr key={index}>
                                        <td>{permission.nombre_permiso}</td>
                                        <td style={{ color: userHasPermission ? 'green' : 'red' }}>
                                            {userHasPermission ? 'Permitido' : 'No permitido'}
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={userHasPermission}
                                                onChange={() => handleCheckboxChange(permission, selectedUser)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
