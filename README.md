# AngularAuthCrud (En desarrollo)

## Descripción del Proyecto

Este proyecto es una aplicación web desarrollada en Angular que incluye un sistema completo de autenticación y CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar usuarios. La aplicación permite a los usuarios registrarse, iniciar sesión, actualizar su información y eliminar su cuenta. Además, se ha implementado la autenticación necesaria para gestionar el acceso de los usuarios a las diferentes secciones de la aplicación.

## Funcionalidades Implementadas

- **Registro de Usuarios**: Los usuarios pueden crear cuentas nuevas proporcionando su información.
- **Inicio de Sesión**: Permite a los usuarios existentes iniciar sesión en sus cuentas.
- **CRUD de Usuarios**:
  - **Crear**: Los administradores pueden añadir nuevos usuarios.
  - **Leer**: Los usuarios pueden ver sus perfiles y la lista de usuarios.
  - **Actualizar**: Los usuarios pueden editar su información.
  - **Eliminar**: Los usuarios pueden eliminar su cuenta.
- **Autenticación**: Se han implementado mecanismos de autenticación para proteger las rutas de la aplicación.
- **Salida**: Un botón que permite a los usuarios cerrar sesión.

## Tecnologías Utilizadas

- **Angular**: Framework utilizado para construir la aplicación.
- **Firebase**: Utilizado para gestionar la autenticación de usuarios.
- **RxJS**: Librería para gestionar la programación reactiva en Angular.
- **Tailwind CSS**: Utilizado para estilizar la aplicación de manera rápida y eficiente.
- **Flowbite**: Componente de interfaz de usuario para mejorar la experiencia visual de la aplicación.
- **ngx-sonner**: Para notificaciones y alertas en la interfaz.

### Estructura de Dependencias

El archivo de configuración `package.json` incluye tanto dependencias como devDependencies, las cuales aseguran que el proyecto funcione correctamente y que los entornos de desarrollo estén bien configurados.

## Estado Actual

La aplicación está funcional en su estado actual, con todas las características mencionadas implementadas y probadas. El siguiente paso será seguir desarrollando la aplicación, mejorando la interfaz y añadiendo nuevas funcionalidades.

## Instrucciones de Instalación

Para instalar y ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/AngularAuthCrud.git
   cd AngularAuthCrud
