import {useState, useEffect} from 'react'

export const EmpresaLoader = ({setEmpresaSeleccionada}) => {
  const [empresas, setEmpresas] = useState([])
  const [empresaSelect, setEmpresaSelect] = useState('')
  const [empresaName, setEmpresaName] = useState('')

  const getEmpresas = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/empresas/all',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!res.ok) {
        throw new Error('Error en la petición')
      }
      const data = await res.json()
      if (data) {
        setEmpresas(data)
      }
    }catch (error) {
      console.log('Error en la petición', error)
    }
  }


  useEffect(() => {
    getEmpresas()
  }, [])


  const handleSelectChange = (e) => {
    const empresaId = e.target.value
    setEmpresaSelect(empresaId)
    setEmpresaSeleccionada(empresaId)
    setEmpresaName(empresas.find(empresa => empresa.id_empresa === empresaId).nombre_empresa)
  }

  return (
    <>
      <label htmlFor="empresa">Seleccionar Empresa: </label>
      <select onChange={handleSelectChange} id='empresa' value={empresaSelect}>
        <option value=''>Seleccionar Empresa</option>
        {empresas.map(empresa => (
          <option key={empresa.id_empresa} value={empresa.id_empresa}>{empresa.nombre_empresa}</option>
          
        ))}
      </select>
      {empresaSelect && (<p>Empresa seleccionada: {empresaName}</p>)}
    </>
  )
}
