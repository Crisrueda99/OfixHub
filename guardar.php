<?php
date_default_timezone_set("America/Bogota"); // Ajusta la zona horaria si es necesario

$archivo = 'mensajes.xml';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);
    $fecha = date("Y-m-d H:i:s");

    // Si el archivo XML no existe, crearlo con una estructura base
    if (!file_exists($archivo)) {
        $xml = new SimpleXMLElement('<mensajes></mensajes>');
    } else {
        $xml = simplexml_load_file($archivo);
    }

    // Obtener el último número de mensaje
    $ultimoID = count($xml->mensaje) ? intval($xml->mensaje[count($xml->mensaje) - 1]['id']) : 0;
    $nuevoID = $ultimoID + 1;

    // Agregar un nuevo mensaje
    $nuevoMensaje = $xml->addChild('mensaje');
    $nuevoMensaje->addAttribute('id', $nuevoID);
    $nuevoMensaje->addChild('nombre', $nombre);
    $nuevoMensaje->addChild('email', $email);
    $nuevoMensaje->addChild('fecha', $fecha);
    $nuevoMensaje->addChild('contenido', $mensaje);

    // Guardar el XML actualizado
    $xml->asXML($archivo);

    echo "Mensaje guardado con éxito.";
}
?>
