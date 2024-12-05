import { useState, useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { SectorService } from "../service/sectorService";
import { useAuth } from "../context/AuthProvider";

export const MedidorDeSeguridad = () => {
    const [stats, setStats] = useState({
        agropecuario: {},
        construccion: {},
        electricidad: {},
        quimica: {},
    });
    const [idEmpresa, setIdEmpresa] = useState('')
    const {user} = useAuth();

    useEffect(()=>{
        if (user){
            setIdEmpresa(user.id_empresa)
        }
    },[user])

    const fetchData = async () => {
        try {
            const statsAgro = await SectorService.getEstadisticaAgro(idEmpresa)
            const dataAgro = await statsAgro.json()
            setStats(prevStats => ({...prevStats, agropecuario: dataAgro}))
            const statsConst = await SectorService.getEstadisticaConst(idEmpresa)
            const dataConst = await statsConst.json()
            setStats(prevStats => ({...prevStats, construccion: dataConst}))
            const statsElec = await SectorService.getEstadisticaElec(idEmpresa)
            const dataElec = await statsElec.json()
            setStats(prevStats => ({...prevStats, electricidad: dataElec}))
            const statsQuim = await SectorService.getEstadisticaQuim(idEmpresa)
            const dataQuim = await statsQuim.json()
            setStats(prevStats => ({...prevStats, quimica: dataQuim}))
        }
        catch (error){
            console.error("Error al obtener las estadísticas:", error);
        }
    }

    useEffect(()=>{
        if (idEmpresa !== '' && idEmpresa !== undefined && idEmpresa !== 'null'){
            fetchData()
        }
    }, [idEmpresa])

    // Función para calcular el promedio
    const calcularPromedio = (sector) => {
        const valores = Object.values(sector);
        const suma = valores.reduce((acc, valor) => acc + valor, 0);
        return (suma / valores.length) * 100;  // Multiplicamos por 100 para obtener un porcentaje
    };

    // Calculamos los promedios para cada sector
    const promedioElectricidad = calcularPromedio(stats.electricidad);
    const promedioAgropecuario = calcularPromedio(stats.agropecuario);
    const promedioConstruccion = calcularPromedio(stats.construccion);
    const promedioQuimica = calcularPromedio(stats.quimica);

    // Promedio global de todos los sectores
    const promedioGlobal = (
        (promedioElectricidad + promedioAgropecuario + promedioConstruccion + promedioQuimica) / 4
    );

    return (
        <Card style={{ height: "100%" }}>
            <Typography
                variant="h6"
                gutterBottom
                style={{ padding: "16px" }}
            >
                Medidor de Seguridad
            </Typography>
            <Box display="flex" justifyContent="center" height="150px">
                <Gauge
                    value={promedioGlobal}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 24,
                        },
                    }}
                    text={({ value, valueMax }) => `${Math.round(value)}%`}
                />
            </Box>
        </Card>
    );
};
