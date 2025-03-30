# Playlist App - Aplicación Angular para Gestión de Listas de Reproducción

Esta aplicación es una prueba técnica que implementa un frontend en Angular para una API REST de gestión de listas de reproducción musical.

## Características

- **Autenticación**: Sistema de login/logout con almacenamiento de tokens JWT
- **Gestión de Listas**: Crear, ver, editar y eliminar listas de reproducción
- **Gestión de Canciones**: Añadir y eliminar canciones de las listas
- **Interfaz Responsiva**: Diseño moderno con Tailwind CSS

## Tecnologías Utilizadas

- Angular 19
- Tailwind CSS (via CDN)
- Angular Material
- RxJS para programación reactiva
- Angular Router para navegación

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                # Servicios, modelos e interceptores compartidos
│   │   ├── guards/          # Guardias de ruta para autenticación
│   │   ├── interceptors/    # Interceptores HTTP
│   │   ├── models/          # Interfaces de datos
│   │   └── services/        # Servicios compartidos
│   ├── features/            # Componentes organizados por funcionalidad
│   │   ├── auth/            # Componentes de autenticación
│   │   └── playlists/       # Componentes de listas de reproducción
│   └── shared/              # Componentes compartidos en toda la aplicación
│       └── components/      # Elementos UI reutilizables
├── environments/            # Configuración de entornos
└── assets/                  # Recursos estáticos
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/playlist-app.git
   cd playlist-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación:

   ```bash
   ng serve
   ```

4. Navega a `http://localhost:4200/` en tu navegador.

## Uso

### Credenciales de Prueba

- Usuario: `admin`
- Contraseña: `admin`

### Funcionalidades

1. **Iniciar Sesión**: Accede con tus credenciales desde la página de login
2. **Ver Listas**: La página principal muestra todas las listas disponibles
3. **Crear Lista**: Usa el botón "Nueva Lista" para crear una lista de reproducción
4. **Detalles de Lista**: Haz clic en cualquier lista para ver sus detalles
5. **Editar Lista**: Desde la vista de detalles, haz clic en "Editar"
6. **Eliminar Lista**: Usa el botón de eliminación junto a cada lista

## Conexión con Backend

La aplicación está configurada para conectarse a un backend REST en `http://localhost:8080`. Puedes cambiar esta configuración en `environments/environment.ts`.

El backend debe implementar los siguientes endpoints:

- `POST /auth/login`: Autenticación con username/password
- `GET /lists`: Obtener todas las listas
- `GET /lists/{listName}`: Obtener detalles de una lista
- `POST /lists`: Crear una nueva lista
- `DELETE /lists/{listName}`: Eliminar una lista

## Desarrollado por

Tu Nombre

## Licencia

Este proyecto está bajo la Licencia MIT.
