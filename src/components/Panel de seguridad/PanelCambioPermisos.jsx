import { useEffect, useState } from 'react';
import { UsuariosPermisos } from './UsuariosPermisos';
import { PermisosService } from '../../service/permisosService';
import { UserService } from '../../service/userService';
import { useAuth } from '../../context/AuthProvider';

export const PanelPermisos = () => {
    const [permissions, setPermissions] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [empresaId, setEmpresaId] = useState('');

    const { user } = useAuth();

    // Función para obtener usuarios
    const fetchUsers = async () => {
        try {
            const response = await UserService.getUserByEmpresa(empresaId);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.usuarios)) {
                    setUsers(data.usuarios);
                } else {
                    console.error('Datos de usuarios no son un array', data);
                    setUsers([]);
                }
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    
    // Función para obtener permisos
    const fetchPermissions = async () => {
        try {
            const response = await PermisosService.getPermisos();
            if (response.ok) {
                const data = await response.json();
                setPermissions(data);
            } else {
                console.error('Failed to fetch permissions');
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };

    // Fetch initial data

    useEffect(() => {
        if (user?.id_empresa || user?.id_empresa === 0) {
            setEmpresaId(user?.id_empresa);
            console.log('Empresa ID:', user?.id_empresa);
        }
    }, [user]);

    useEffect(() => {
        const loadData = async () => {
            await fetchPermissions();
            if (empresaId !=='' && empresaId !== undefined) {
                await fetchUsers(); // Llama a la función fetchUsers
            }
        };
        loadData();
    }, [empresaId]);

    // Función para obtener un usuario por ID
    const fetchUserById = async (id) => {
        try {
            const response = await UserService.getUserById(id);
            if (response.ok) {
                const data = await response.json();
                if (data.Usuario) {
                    setSelectedUser(data.Usuario);
                } else {
                    console.error('User not found');
                }
            } else {
                console.error('Failed to fetch user');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // Función para manejar clic en un usuario
    const handleClick = (user) => {
        fetchUserById(user.id);
    };

    const handlePermissionAdd = async (permission, user) => {
        if (!user || !permission) {
            console.error('User or permission is undefined');
            return;
        }
    
        try {
            const response = await PermisosService.addPermiso({ id_user: user.id, id_permiso: permission.id });
            console.log('Add permission response:', response);
    
            if (response.ok) {
                const data = await response.json();
                console.log('Add permission data:', data);
                fetchUserById(user.id);
            } else {
                const error = await response.json();
                console.error("Error adding permission:", error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };
    
    const handlePermissionRemove = async (permission, user) => {
        if (!user || !permission) {
            console.error('User or permission is undefined');
            return;
        }
    
        try {
            const response = await PermisosService.deletePermiso({ id_user: user.id, id_permiso: permission.id });
            console.log('Remove permission response:', response);
    
            if (response.ok) {
                const data = await response.json();
                console.log('Remove permission data:', data);
                fetchUserById(user.id);
            } else {
                const error = await response.json();
                console.error("Error removing permission:", error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };
    

    // Función para manejar el cambio de estado del checkbox
    const handleCheckboxChange = (permission, user) => {
        if (!selectedUser) return;

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
                                if (!selectedUser.rol) return null; // Asegúrate de que `selectedUser.rol` exista
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
