![image](https://github.com/user-attachments/assets/5cea8a12-c0eb-4b64-8618-7af623f38665)# Nuestras Asignaciones Web

Proyecto WEB destinado a la visualización de horarios laborales de cada colaborador de Burger King ordenado por local.

La motivación de este proyecto es brindar una herramienta funcional que permita a los trabajadores de Burger King visualizar sus horarios de una manera cómoda y principalmente ver con qué compañeros se va a trabajar. Sin embargo, el proyecto se encuentra en constante evolución, y no se descarta que en un futuro se le incorporen nuevas funcionalidades que permitan por ejemplo el control de horas teóricas graficadas, o la validación de la disponibilidad dispuesta al local. 

# ¿cómo funciona?
Originalmene, los empleados debemos utilizar una aplicación llamada Mis Asignaciones, en la cual, uno introduce un legajo y la aplicación le despliega los horarios relacionados a dicho legajo. Sin embargo, esta manera de consultar deja de lado la posibiliodad de saber con quien se trabaja. Internamente la aplicación realiza un fetch a la API correspondiente especificándole el legajo del que se desea consultar. 

Entonces, si se tienen todos los legajos de un local, uno puede "traerse" todas las asignaciones que tenga ese local ¿no? Esto así funciona, sin embargo, uno no recuerda absolutamente todos los legajos de sus compañeros, por lo que resulta necesario que se especifique su nombre.  

Al tratarse de una relación sencilla, la cual puede ser expresada en una tabla simple, carese de sentido complicarse con una base de datos. Por esto entre otros factores, es más sensato hacer uso de un sistema  amigable para cualquier mortal. Google Sheet nos permite crear un archivo que contenga los legajos y sus nombres correspondientes. Estos sheets los maneja cada local, es decir, no necesitan pasar por mi para cambiar algún nombre, algún legajo o sacar/añadir colaboradores. Yo unicamente necesito el link que apunte al local (distinto del link del sheet) el cual se especifica más adelante.  
Al establecer una relación con la página, a esta unicamente se le necesitará especificar el identificador del local y ya sabrá a qué Sheet deberá ir a buscar la información, y teniendo todos los nombres y legajos, el resto es lógica interna. 

El sistema del identificador permite que sus horarios solo puedan ser visibles por quien sepa ese identificador. Además, si este id no es descriptivo del local, sería imposible para alguien externo saber de qué local se trata, ya que la página no muestra siquiera legajos.  

Pagina: https://franciscoraffin.github.io/NuestrasAsignacionesWeb/


![IMAGEN_MPD](https://github.com/FranciscoRaffin/NuestrasAsignacionesWeb/blob/main/readme_imagenes/ejemplo.png)


# ¿cómo agrego mi local al sistema?

1° Creas un spreedsheet en https://docs.google.com/spreadsheets siguiendo la estructura que se muestra en la foto anterior.

2° Clickeas Archivo->Compartir -> Publicar en la Web
![image](https://github.com/user-attachments/assets/337ff39b-e72d-4194-afb0-203450030f8a)

3°
Seleccionas "Valores separados por comas (.csv)" y publicar en la web.
![image](https://github.com/user-attachments/assets/95259916-2387-4d7f-92a7-4ff881c5db3e)

4°
El paso anterior te debería dar un link. Comunicate conmigo especificando el identificador que desees para tu local y ya estaría.


## Aclaración

El proyecto de gráficas se encuentra libre de toda licencias. Sin embargo, por obvias razones se recomienda encarecidamente consultar con los gerentes a cargo del local y los colabopradores del mismo antes de añadirlos a su tabla. Cada local cuenta por tanto con al menos una persona con acceso a la tabla, las cuales serán las responsables de los nombres y legajos que se asocie en dicha tabla.
