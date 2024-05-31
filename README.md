# Expenses-Budgets

Sitio de gestión y control de gastos y presupuestos. Realizada con el fin de 
ayudar al usuario a que controle un poco mas sus finanzas, ajustándose a un presupuesto 
fijado por él mismo y, tomando como base ciertas categorías de gastos; entre las cuales están: 

1. Comida.
2. Ahorro.
3. Casa.
4. Gastos Varios.
5. Ocio.
6. Salud.
7. Suscripciones.

# Instalacion de dependencias

  - npm install. 

# Iniciar el servidor de desarrollo
  - npm run dev.

# Tecnologias utilizadas
Este proyecto fue desarrollado utilizando las siguientes tecnologias: 

  - React + Vite + TypeScript: Para la estructura y creación de los componentes. 
  - Tailwind: Para los estilos y el diseño de las interfaces; 
  - Heroicons: Inclusión de librería de iconos. 
  - uuid: Para la generación de id's. 
  - Librerías de componentes:
    - react-circular-progressbar. 
    - react-swipeable-list.
    - react-calendar.
    - react-date-picker. 
  - prop-types: Para la validación de tipos de datos; 

# Funcionalidades especificas

El usuario al inicio puede registrar su presupuesto y posterior a ello, cada uno de los gastos, 
donde el tracker del sitio le va a ir arrojando, el saldo disponible que le queda basado en 
el presupuesto inicial y lo que se ha gastado hasta el momento en diferentes formatos. 

El usuario también tendrá la posibilidad de eliminar y de actualizar o cambiar datos de los gastos registrados
deslizando el contenedor del gasto a la derecha y a la izquierda respectivamente. Y de reiniciar el proceso 
mediante un botón de reseteo de la información.

# Deploy

El sitio se puede ver actualmente en https://symphonious-pie-25b2c4.netlify.app/
Implementado con Netlify.