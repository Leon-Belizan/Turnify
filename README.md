# Turnify Salud

Turnify Salud es una página web académica para explorar centros médicos y preparar una solicitud de turno de demostración.

## Cómo abrir el sitio

1. Abrí la carpeta `HTMLPracticas` en Visual Studio Code.
2. Abrí `index.html` con la extensión Live Server o desde el navegador.
3. Para que Bootstrap y los íconos externos carguen, necesitás conexión a internet.

## Tecnologías

- **HTML** define el contenido y la estructura semántica de cada página.
- **CSS** da estilo a la marca, las tarjetas, la portada y la adaptación a celulares.
- **JavaScript** filtra centros, guarda favoritos en el navegador y muestra respuestas de ejemplo en los formularios.
- **Bootstrap 5.3.8** aporta la grilla adaptable, los formularios, botones y el menú desplegable para pantallas pequeñas. Se carga desde jsDelivr siguiendo la [documentación oficial de Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/).
- **Git** registra el historial de cambios del proyecto.

## Estructura de carpetas

```tex
HTMLPracticas/
├── index.html                 # Inicio, búsqueda, centros destacados y especialidades
├── pages/
│   ├── centros.html            # Directorio con filtros
│   ├── como-funciona.html      # Explicación del recorrido
│   ├── contacto.html           # Formulario de contacto de muestra
│   ├── sacar-turno.html        # Solicitud de turno de demostración
│   ├── iniciar-sesion.html     # Pantalla de ingreso de demostración
│   └── registro.html           # Pantalla de registro de demostración
├── styles/main.css             # Estilos propios y reglas para móvil
├── JavaScript/main.js          # Filtros, favoritos y formularios
└── img/                        # Imágenes y logotipo


## Guía para explicar el código

### HTML

Cada página usa `<!doctype html>`, `lang="es"` y metadatos para que el navegador interprete el documento y ajuste la vista a celulares. Dentro de `<head>` se cargan Bootstrap, Font Awesome y `styles/main.css`. El CSS propio va al final para poder personalizar la apariencia de Bootstrap.

El `<header>` contiene la navegación. Las secciones del `<main>` agrupan el contenido por tema y el `<footer>` contiene enlaces secundarios. Los comentarios en los archivos HTML señalan qué hace cada bloque.

En las páginas internas, las rutas empiezan con `../` para subir desde `pages/` a la carpeta del proyecto. Por ejemplo, `../styles/main.css` apunta a la hoja de estilos compartida.

### CSS

`styles/main.css` define primero los colores en `:root` para poder reutilizarlos. Luego agrupa reglas para la navegación, portada, tarjetas, formularios y pie de página. Las clases `@media` cambian tamaños y distribución en pantallas chicas. Bootstrap se ocupa de la grilla; este archivo aplica la identidad visual de Turnify.

### JavaScrip

`JavaScript/main.js` se incluye al final de cada página con `defer`, así el navegador carga el HTML antes de ejecutar las interacciones.

- `normalizar()` pasa el texto a minúsculas y quita tildes para comparar búsquedas con más facilidad.
- El bloque `[data-filter-form]` lee los filtros y oculta las tarjetas que no coinciden.
- Los botones `[data-favorite]` alternan favoritos y los guardan en `localStorage` del navegador.
- Los carruseles de Inicio usan desplazamiento horizontal con ajuste a cada tarjeta; se pueden deslizar o controlar con las flechas en celular.
- `[data-contact-form]` valida el formulario y muestra una respuesta de demostración.
- `[data-booking-form]` acepta una solicitud ficticia y puede preseleccionar el centro indicado en el enlace.
- `[data-auth-form]` valida los formularios de ingreso y registro y confirma la demostración sin guardar ni enviar contraseñas.

Los atributos `data-*` conectan los elementos del HTML con JavaScript sin depender de nombres de estilo. Los formularios usan validación HTML (`required`, `type="email"` y `minlength`) antes de mostrar la respuesta.

## Alcance de la demostración

Los centros y las solicitudes son datos de ejemplo. No hay servidor, cuenta de usuario ni conexión con clínicas; los formularios no transmiten información personal. Ingreso y registro son pantallas de demostración: para autenticar usuarios de verdad hace falta un servidor seguro. Los favoritos se guardan solo en el navegador usado para la demostración.

## Git y GitHub

El historial local de Git ya está iniciado. Para revisar los cambios y preparar una nueva versión:

```bash
git status
git add .
git commit -m "Describe el cambio realizado"


Este proyecto ya está conectado al repositorio `Leon-Belizan/Turnify`. Para guardar y subir cambios nuevos:

```bash
git status
git add .
git commit -m "Describe el cambio realizado"
git push -u origin main


GitHub solicitará autenticación mediante el navegador o el método configurado en tu computadora. No pongas contraseñas ni tokens dentro del código.

## Posible orden para la exposición

1. Presentar Turnify Salud y el problema que busca resolver.
2. Recorrer Inicio, Centros, Cómo funciona y Sacar turno.
3. Mostrar la grilla adaptable de Bootstrap y los estilos propios de CSS.
4. Buscar un centro y guardar uno como favorito para mostrar JavaScript.
5. Explicar la organización de carpetas y cómo Git conserva cambios.
6. Aclarar que es una maqueta académica sin conexión a centros reales.
