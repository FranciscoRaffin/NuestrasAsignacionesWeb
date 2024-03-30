import tkinter as tk 
import ttkbootstrap as ttk 
from main import * 
from datetime import datetime, timedelta
"""
root = tk.Tk()
for font in font.families():
    print(font)
"""

# FUNCIONES 
def actualizarAsignaciones(): 
    limpiar_contenido()

    mostrarError() # Lo muestra unicamente de haber un error
    local = asignacionesLocal(legajos_local)
    #mostrarAlmacenando() # NO LO MUESTRA
    insertar_local(local)
    mostrarResultado()
    

#mensajes
def mostrarError():
    output_sting.set("Error al actualizar los datos. Posiblemente Asignaciones se encuentre caido.") 

def mostrarAlmacenando():
    output_sting.set("Almacenando datos...")

def mostrarResultado():
        output_sting.set(f"""
        Datos almacenados con éxito
                     
    - Actualizadas: {asignaciones_insertadas.contador}      -Omitidas: {asignaciones_omitidas.contador}
    """)


def limpiarMensaje():
    output_sting.set("")

def limpiar_contenido():
    limpiarMensaje()

    for elemento in frame_contenido.winfo_children():
        elemento.destroy()


def mostrarAsignaciones():

    limpiar_contenido()

    dias_a_revisar = 10
    graficas_por_renglon = 3
    fecha_actual = datetime.now().date().strftime("%d/%m/%Y")


    fechas_a_mostrar = obtener_n_siguientes_fechas(fecha_actual,dias_a_revisar)
 
    
    frame = ttk.Frame(master=frame_contenido)
    frame.pack(side="top")

    for fecha in fechas_a_mostrar:

        if hay_grafica_de(fecha):
            graficas_hasta = fecha
            mostrar_tabla(frame,consultar_asignaciones_por_fecha(fecha))

            if graficas_por_renglon != 1:
                graficas_por_renglon -= 1
            else: 
                frame = ttk.Frame(master=frame_contenido)
                frame.pack(side="top")
                graficas_por_renglon = 3
                

        dias_a_revisar-=1
        


    output_sting.set(f"  Fecha de consulta: {fecha_actual} - Graficas hasta: {graficas_hasta}")



def obtener_n_siguientes_fechas(fecha_inicial, n):
    fechas_siguientes = [fecha_inicial]

    for _ in range(n-1):
        fecha_inicial = fecha_siguiente(fecha_inicial)
        fechas_siguientes.append(fecha_inicial)

    return fechas_siguientes

def consultar_asignaciones_por_fecha(fecha_consulta):
    # Establecer conexión a la base de datos (asegúrate de establecer la conexión antes de llamar a esta función)
    conexion = sqlite3.connect("colaboradoresV2.db")
    cursor = conexion.cursor()

    # Consulta SQL
    consulta_sql = f"""
        SELECT fecha, hora_entrada, hora_salida, nombre
        FROM colaborador_asignaciones
        JOIN nombres ON legajo = legajo_fk AND fecha = '{fecha_consulta}'
        ORDER BY hora_entrada;
    """

    try:
        # Ejecutar la consulta
        cursor.execute(consulta_sql)

        # Obtener los resultados
        resultados = cursor.fetchall()

        # Cerrar el cursor y la conexión
        cursor.close()
        conexion.close()

        return resultados

    except sqlite3.Error as e:
        print(f"Error en la consulta: {e}")
        return None


def hay_grafica_de(fecha): 
    return len(consultar_asignaciones_por_fecha(fecha)) != 0





def hay_asignaciones_de(fecha):
    conexion = sqlite3.connect("colaboradoresV2.db")
    cursor = conexion.cursor()

    # Consulta SQL
    consulta_sql = f"""
        SELECT COUNT(*)
        FROM colaborador_asignaciones
        WHERE fecha = '{fecha}';
    """
    try:
        # Ejecutar la consulta
        cursor.execute(consulta_sql)

        # Obtener el resultado
        resultado = cursor.fetchone()[0]

        # Cerrar el cursor y la conexión
        cursor.close()
        conexion.close()

        return resultado <= 0
    

    except sqlite3.Error as e:
        print(f"Error en la consulta: {e}")
        return None







def fecha_siguiente(fecha_str):
    # Convertir la cadena de fecha a un objeto de fecha
    fecha_obj = datetime.strptime(fecha_str, "%d/%m/%Y")

    # Añadir un día a la fecha
    fecha_siguiente_obj = fecha_obj + timedelta(days=1)

    # Formatear la nueva fecha como cadena en el formato original
    fecha_siguiente_str = fecha_siguiente_obj.strftime("%d/%m/%Y")

    return fecha_siguiente_str


def mostrar_tabla(frame,data):

    # Crear el Treeview
    tree = ttk.Treeview(frame, columns=("Fecha", "Hora Entrada", "Hora Salida", "Nombre"), show="headings")

    # Configurar las columnas
    tree.heading("Fecha", text="Fecha")
    tree.heading("Hora Entrada", text="Hora Entrada")
    tree.heading("Hora Salida", text="Hora Salida")
    tree.heading("Nombre", text="Nombre")
    

    # Agregar datos a la tabla
    for item in data:
        tree.insert("", "end", values=item)


    # Ajustar las columnas para que se ajusten al contenido
    for col in ("Fecha", "Hora Entrada", "Hora Salida", "Nombre"):
        tree.column(col, width=100,)
        tree["height"] = len(data)


    tree.pack(pady=4,padx=3, side="left")
    



# VENTANA
ventana = ttk.Window(themename="journal")
ventana.title("Graficas V5.7")
ventana.geometry("1280x900")




# CONTENIDO
titulo_label = ttk.Label(master=ventana, text="Test 8", font="Georgia 16")
titulo_label.pack()


# Frame para los botones
frame_botones = ttk.Frame(master=ventana)
frame_botones.pack(side="top", pady=10)

boton_update = ttk.Button(master=ventana, text="Actualizar Asignaciones", command=actualizarAsignaciones)
boton_update.pack(side="bottom", pady=5)

input_fecha = ttk.DateEntry(master=frame_botones)
input_fecha.pack(side="left")

boton_mostrarGraficas = ttk.Button(master=frame_botones, text="Mostrar Asignaciones", command=mostrarAsignaciones)
boton_mostrarGraficas.pack(side="left", padx=1)







output_sting = tk.StringVar()
output_label = ttk.Label(
    master=ventana,
    text="salida",
    font="Verdana 12",
    textvariable=output_sting
)
output_label.pack(pady=5)


frame_contenido = ttk.Frame(master=ventana)
frame_contenido.pack(side="top")




ventana.mainloop()


