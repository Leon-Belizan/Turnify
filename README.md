# Turnify Salud

Turnify Salud es un proyecto académico para explorar centros médicos y preparar una solicitud de turno de demostración.

## Cómo abrir el sitio

1. Abrí la carpeta `HTMLPracticas` en Visual Studio Code.
2. Abrí `index.html` con Live Server o desde el navegador.
3. Para cargar Bootstrap y los íconos externos, necesitás conexión a internet.

## Tecnologías

- **HTML** define el contenido y la estructura semántica de las páginas.
- **CSS** aplica la identidad visual, las tarjetas y los ajustes para pantallas chicas.
- **JavaScript** filtra centros, guarda favoritos en el navegador y valida formularios de demostración.
- **Bootstrap 5.3.8** aporta la grilla adaptable y los componentes de interfaz.
- **Git y GitHub** guardan el historial y permiten compartir el proyecto.

## Organización del proyecto

```text
HTMLPracticas/
├── index.html                 # Inicio, búsqueda, centros, especialidades y hoja de ruta
├── pages/
│   ├── centros.html            # Directorio con filtros
│   ├── como-funciona.html      # Pasos para usar la demostración
│   ├── contacto.html           # Formulario de contacto de muestra
│   ├── sacar-turno.html        # Solicitud de turno de demostración
│   ├── iniciar-sesion.html     # Ingreso de demostración
│   └── registro.html           # Registro de demostración
├── styles/main.css             # Diseño visual y adaptación responsive
├── JavaScript/main.js          # Filtros, carruseles, favoritos y formularios
├── img/                        # Imágenes y logotipo
└── GUION-EXPOSICION.md         # Texto para presentar el proyecto
```

## Cómo se conectan los archivos

Las páginas HTML cargan `styles/main.css` y `JavaScript/main.js`. Los atributos `data-*` del HTML identifican formularios, tarjetas y controles para que JavaScript pueda encontrar y actualizar esos elementos. Bootstrap organiza las columnas y aporta componentes; el CSS propio define los colores y la apariencia de Turnify.

En las páginas de `pages/`, las rutas comienzan con `../` para volver a la carpeta principal. Por ejemplo, `../styles/main.css` carga la hoja de estilos compartida.

## Comportamiento de la demostración

- El buscador filtra por ubicación y especialidad.
- Los favoritos se guardan en el almacenamiento local del navegador.
- Los formularios muestran respuestas de ejemplo y no envían datos.
- El registro y el inicio de sesión no crean ni autentican cuentas.
- Los centros y horarios son ilustrativos; no se reservan turnos reales.

Para convertir el proyecto en un servicio real, hará falta un servidor, una base de datos y medidas de seguridad para las cuentas y la información personal.

## Guardar cambios con Git

```bash
git status
git add .
git commit -m "Describe el cambio realizado"
git push origin main
```

El repositorio está en [github.com/Leon-Belizan/Turnify](https://github.com/Leon-Belizan/Turnify). GitHub puede solicitar autenticación; no guardes contraseñas ni tokens dentro del código.

## Guion para la exposición

El texto listo para leer en voz alta está en [GUION-EXPOSICION.md](GUION-EXPOSICION.md). Sus secciones están escritas en MAYÚSCULAS para que se puedan encontrar y seguir fácilmente durante la presentación.
