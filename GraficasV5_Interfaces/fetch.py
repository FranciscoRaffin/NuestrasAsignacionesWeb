import requests
import json
from datetime import datetime
import sqlite3



class contador(): 
    def __init__(self):
        self.contador = 0

    def aumentar(self): 
        self.contador += 1

asignaciones_omitidas = contador()
asignaciones_insertadas = contador()



# FETCHING (funciones)

def asignacionesLocal(lista:list[str]) -> list[list]:
    """
        [legajos] --> [[asignaciones]]  
    """

    asignaciones = []

    for legajo in lista: 
        asignaciones += lista_asignaciones_de(legajo)

    return asignaciones


def lista_asignaciones_de(legajo:str) -> list:
    """
        legajo --> [asignaciones]
    """

    print(f"Buscando {legajo}")
    datos = json.loads(requests.get(f"https://api.asignaciones.com.ar/start.php?CP=BK&legajo={legajo}").content)

    asignaciones = datos['asignaciones']
    fecha_consulta = datos['fechaConsulta']
    legajo = datos['legajo']
    resultado = []
    dias_procesados = set()  # Para mantener un registro de los días procesados

    for asignacion in asignaciones:
        fecha = asignacion['fecha']
        dia_semana = fecha.split()[0]
        if dia_semana not in dias_procesados:
            dia_semana = fecha.split()[0]
            fecha_sin_anio = fecha.split()[1]
            fecha_con_anio = f"{fecha_sin_anio}/{datetime.now().year}"  # Agregar el año actual
            fecha_formato = datetime.strptime(fecha_con_anio, '%d/%m/%Y').strftime('%d/%m/%Y')
            hora_entrada = asignacion['horaEntrada']
            hora_salida = asignacion['horaSalida']
            resultado.append([legajo ,fecha_formato,dia_semana, hora_entrada, hora_salida, fecha_consulta])
    

    return resultado 








# INSERCIÓN (procedimientos)

def insertar_local(lista:[list]):

    for asignacion in lista: 
        insertar_asignacion(asignacion)


def insertar_asignacion(datos):

    legajo, dia_semana, fecha, hora_entrada, hora_salida, momento_consulta = datos

    conn = sqlite3.connect('colaboradoresV2.db')  
    cursor = conn.cursor()

    # Verificar si ya existe una asignación con la misma clave primaria
    cursor.execute("SELECT * FROM colaborador_asignaciones WHERE fecha = ? AND legajo = ?",
                   (dia_semana, legajo))
                
    if cursor.fetchone() is None:
        # Si no existe, realizar la inserción
        cursor.execute("INSERT INTO colaborador_asignaciones VALUES (?, ?, ?, ?, ?, ?)",
                       (legajo, dia_semana, fecha,  hora_entrada, hora_salida, momento_consulta))
        conn.commit()
        asignaciones_insertadas.aumentar()
    
    else:
        asignaciones_omitidas.aumentar()
    conn.close()



 


