# ServiceXML

Este es un módulo TypeScript que facilita la comunicación con un servicio web SOAP mediante el intercambio de archivos XML. Permite la lectura de un archivo WSDL, sustituye datos específicos en el objeto XML según la lógica definida y realiza una solicitud POST al servicio web SOAP, esperando su respuesta.

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio o copia el contenido del archivo directamente en tu proyecto.
2. Ejecuta `npm install` para instalar las dependencias necesarias.

## Uso

1. **Configuración del Archivo WSDL:**
   Asegúrate de tener un archivo WSDL válido. En este ejemplo, el archivo WSDL se llama `test.wsdl` y debe colocarse en la misma carpeta que el archivo TypeScript.

2. **Configuración de las Variables de Entorno:**
   Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno para el usuario y contraseña del servicio web SOAP. Puedes hacerlo creando un archivo `.env` en la raíz de tu proyecto con las siguientes variables:

   ```env
   SOAP_USER=nombre_de_usuario
   SOAP_PASSWORD=contraseña
   SOAP_URL=url_del_servicio_web
   ```

3. **Ejecutar la Aplicación:**
   Ejecuta la aplicación con el siguiente comando:

   ```bash
   npm start
   ```

   Este comando realizará la lectura del archivo WSDL, sustituirá los datos según la lógica definida en el método `replace`, realizará la solicitud POST al servicio web SOAP y mostrará la respuesta en la consola.

## Personalización

Siéntete libre de personalizar la lógica de sustitución de datos en el método `replace` según los requisitos específicos de tu servicio web SOAP. Asegúrate también de ajustar la URL del servicio web en el método `makePostRequest` y de manejar las respuestas según tus necesidades en el método `parseResponse`.

Recuerda que este es un ejemplo básico y puede necesitar modificaciones según la complejidad de tu aplicación y los requisitos específicos del servicio web SOAP que estás utilizando.