# Nuestras Asignaciones Web

Proyecto WEB destinado a la visualización de horarios laborales de cada colaborador de Burger King ordenado por local.

La motivación de este proyecto es brindar una herramienta funcional que permita a los trabajadores de Burger King visualizar sus horarios de una manera cómoda y principalmente ver con qué compañeros se va a trabajar. Sin embargo, el proyecto se encuentra en constante evolución, y no se descarta que en un futuro se le incorporen nuevas funcionalidades que permitan por ejemplo el control de horas teóricas graficadas, o la validación de la disponibilidad dispuesta al local. 

# ¿cómo funciona?
Si se tienen todos los legajos de un local, se pueden obtener todas las asignaciones de ese local. Pero como no es práctico recordar todos los legajos, se necesita especificar los nombres.

En lugar de complicarse con una base de datos, se utiliza Google Sheets para manejar los legajos y nombres de los empleados. Cada local gestiona su propio sheet, y solo se necesita el enlace del sheet específico. Al especificar el identificador del local, la página sabe a qué sheet debe buscar la información.

El sistema de identificadores permite que los horarios solo sean visibles para quienes conozcan el identificador. Además, si el identificador no es descriptivo del local, será imposible para alguien externo saber de qué local se trata, ya que la página no muestra legajos.


Página del proyecto: [Nuestras Asignaciones Web](https://franciscoraffin.github.io/NuestrasAsignacionesWeb/)


<img src="https://github.com/FranciscoRaffin/NuestrasAsignacionesWeb/blob/main/readme_imagenes/ejemplo.png" alt="Ejemplo de Horarios" width="600"/>


# ¿cómo agrego mi local al sistema?

1° Creas un spreedsheet en [Google Spreadsheets](https://docs.google.com/spreadsheets) 
siguiendo la estructura que se muestra en la foto anterior.

2° Clickeas Archivo->Compartir -> Publicar en la Web <br>
<img src="https://github.com/user-attachments/assets/337ff39b-e72d-4194-afb0-203450030f8a" alt="2" width="400"/>

3°
Seleccionas "Valores separados por comas (.csv)" y publicar en la web. <br> 
<img src="https://github.com/user-attachments/assets/95259916-2387-4d7f-92a7-4ff881c5db3e"  width="400"/>


4°
El paso anterior te debería dar un link. Este es el que se utilizará dentro del sistema para definir la relacion.


## Aclaración

El proyecto de gráficas se encuentra libre de toda licencias. Sin embargo, por obvias razones se recomienda encarecidamente consultar con los gerentes a cargo del local y los colabopradores del mismo antes de añadirlos a su tabla. Cada local cuenta por tanto con al menos una persona con acceso a la tabla, las cuales serán las responsables de los nombres y legajos que se asocie en dicha tabla.
