from locales_y_funciones_aux import *
# .open colaboradoresV2.db
# select fecha, hora_entrada, hora_salida, nombre from colaborador_asignaciones join nombres on legajo = legajo_fk;
# select fecha, hora_entrada, hora_salida, nombre from colaborador_asignaciones join nombres on legajo = legajo_fk and fecha = '14/10/2023' order by hora_entrada;
legajos_local = legajos_bernal


if __name__ == "__main__":

    for i in range(50): print()

    print("""
    ###################################################
    ---------------------------------------------------

    Cargando datos...""")

    local = asignacionesLocal(legajos_local)

    print("Guardando datos...")

    insertar_local(local)

    print(f"""

    La base de datos fue actualizada correctamente :)

    Asignaciones actualizadas: {asignaciones_insertadas.contador}
    Asignaciones omitidas por repeticion: {asignaciones_omitidas.contador}
    ---------------------------------------------------
    ###################################################

    """)


#INSERT INTO nombres (nombre, legajo) VALUES ('Walter R', '18893');

