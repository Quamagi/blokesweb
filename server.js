const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = 'text/html';

  // Establecer tipos de contenido para otros tipos de archivos estáticos (CSS, imágenes, etc.)
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    // Puedes añadir más tipos de archivo según sea necesario
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Si el archivo no se encuentra, envía un código de respuesta 404 (no encontrado)
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // Otro error del servidor
        res.writeHead(500);
        res.end(`Error interno del servidor: ${err.code}`);
      }
    } else {
      // Archivo encontrado, envíalo al cliente
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Agregar soporte para POST 
server.on('POST', (req, res) => {

    let body = '';
  
    // Recolectar el body de la petición
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', () => {
  
      // Parsear el body como JSON
      body = JSON.parse(body);  
  
      // Guardar el archivo JSON
      fs.writeFile('productos.json', JSON.stringify(body), err => {
        if (err) {
          // Manejar error
        } else {
          // Respuesta exitosa
          res.end('Guardado con éxito!'); 
        }
      });
  
    });
  
  });