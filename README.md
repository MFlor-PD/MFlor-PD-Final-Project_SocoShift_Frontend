# 🏖️ SocoShifts Frontend

## 🚀 Introducción  
Aplicación para generar cuadrantes dinámicos orientados al socorrismo.

---

## ⚡ Inicio rápido

1. Clonar el repositorio y posicionarse en la carpeta del frontend.  
2. Instalar Vite si no está instalado:  
   ```bash
   npm create vite@latest - framwork:react - variante: js + swc 
3. Instalar dependencia:
   npm install
4. Instalar Axios:
   npm install axios
5. Correr la app e modo desarrollo:
   npm run dev

## 📂 Estructura del proyecto:

src/
├── components/          # Lógica y componentes visuales
│   ├── UsuarioForm.jsx          # Formulario para crear usuarios (nombre, apellido, rol, playa asignada)
│   ├── UsuarioList.jsx          # Lista editable de usuarios con opción a asignar días o eliminar
│   ├── ConfigCuadranteForm.jsx # Formulario para parametrizar mes, horas mínimas, carga diaria y cantidad mínima de socorristas
│   ├── GenerarCuadranteForm.jsx    # Genera cuadrante según configuración y usuarios disponibles, muestra mensaje de éxito/error y permite mostrar calendario
│   ├── MostrarCuadrante.jsx    # Renderiza el calendario visualmente, boton para guardar en LS y Boton para mostrarlos
│   ├── CalendarioGlobal.jsx    # Lógica para convertir JSON en tablas para calendario
│   ├── ModalConfirmacion.jsx   # Si editas un cuadrante y lo vas a guardar, te visa antes de sobreescribir.  
│   └── ListarCuadrantesGuardados.jsx # Renderiza, enlista y muestra los cuadrantes guardados en LS.
│
├── css/                   # Archivos CSS para páginas y componentes
|
├── helper/                
|   └── localStorage.js    # Logica del localStorage
│
├── pages/                 # Páginas principales
│   ├── Home.jsx
│   ├── Usuarios.jsx         # Página con formulario de usuario
│   ├── ListaUsuarios.jsx    # Página con lista de usuarios
│   ├── CuadranteConfig.jsx  # Página de configuración de cuadrante
│   ├── CuadranteGenerar.jsx # Página para generar cuadrante
│   ├── CuadranteMostrar.jsx # Página que muestra el calendario
│   
├── routes/                # Lógica de rutas
│   └── route.jsx
│
├── services/              # Servicios y conexión con backend
│   └── api.js             # Axios configurado para comunicarse con backend
│
├── App.jsx
├── Main.jsx

   
## 🛠️ Funcionamiento:

La página principal Home muestra un título, breve descripción y tres botones:

Usuarios: Lleva al formulario para crear usuarios.

Desde Usuarios, un botón lleva a la lista de usuarios donde se pueden editar, eliminar o asignar días.

Cuadrante: Lleva al proceso paso a paso para configurar, generar y mostrar el cuadrante.

Ver Cuadrantes: Permite ingresar un mes para consultar y muestra una lista con las configuraciones guardadas, con opciones para ver, editar o eliminar. Tambien muestra un boton de enlistar cuadrantes guardados sobre el calendario y te muestra la lista los que se han guardado en el Local Storage.

En la lista de usuarios se muestran los datos de cada uno, si están autorizados para manipular datos sensibles (funcionalidad en desarrollo con JWT), y si tienen días asignados. Se puede editar o eliminar desde la misma lista.

El botón Ver Cuadrante desde Home permite consultar el calendario de un mes específico. Muestra las configuraciones guardadas y permite generar o editar el cuadrante.

El botón Cuadrante lleva a la configuración, generación y posterior visualización del cuadrante.

## 🧰 Herramientas utilizadas:

* React

* Vite

* react-router-dom

* react-loader-spinner

* axios

## ⚠️ Nota final:

Esta aplicación es escalable y podría adaptarse a otros rubros.
La versión actual es básica debido a la complejidad del proyecto.

Las rutas de autorización aún están en desarrollo.

Los cuadrantes no tienen persistencia completa debido a la cantidad de datos, solo se guarda la configuración.

## 👩‍💻 Autor:

Aplicación construida por Ma. Flor P.D ✨

## 📞 Contacto:

Si querés colaborar o reportar bugs, contactame:
[mariaflorenciaperezd@gmail.com]

¡Gracias por usar SocoShifts! 🌊🏄‍♂️



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
