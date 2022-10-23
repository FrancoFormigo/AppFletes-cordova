<?php

//Permite el acceso desde cualquier origen
header('Access-Control-Allow-Origin: *');

//Conexion a la base de datos MySql
$conexion = mysqli_connect("localhost", "id19569690_iestsdsids2", "Ing+Software2", "id19569690_iesusuarios") or die(mysqli_error());
//echo "pase la conexion::::  ";

//Definicion de variables recibidas del post

//En produccion.......
$Dni = $_POST['Dni'];
$Peso = $_POST['Peso'];
$Origen = $_POST['Origen'];
$Destino = $_POST['Destino'];

$sql1 = "INSERT INTO Detalle_Pedido (Peso, Origen, Destino) VALUES ($Peso, '$Origen', '$Destino')";
//Ejecuta la consulta
$consulta1 = $conexion->query($sql1);

//echo ("pase la ejecucion");

//Arma la cabecera "json"
header('Content-Type: application/json');

//Verifica si modifico la fila en la tabla
if ($consulta1) {
    //Si obtuvo true retorna "ok" al cliente y el "id" del nuevo usuario
    $id = mysqli_insert_id($conexion);
    $pedido = array('estado' => 'ok', 'idPedidoNuevo' => $id);

    $Id_Usuario = "SELECT Id FROM Usuarios WHERE Dni= $Dni";
    $consulta2 = $conexion->query($Id_Usuario);

    $Id_Pedido = "SELECT Id FROM Detalle_Pedido WHERE Peso = '$Peso' AND Origen = '$Origen' AND Destino = '$Destino'";
    $consulta3 = $conexion->query($Id_Pedido);

    $sql2 = "INSERT INTO Pedido (Id_Pedido, Id_Usuario) VALUES ('$Id_Pedido', '$Id_Usuario')";
    $consulta4 = $conexion->query($sql2);
} else {
    //Si obtuvo false retorna "" al cliente
    $pedido = array('estado' => '', 'idPedidoNuevo' => '0');
}

//Codifica y retorna en formato json el array
echo json_encode($pedido, JSON_FORCE_OBJECT);

//cierra la conexion
$conexion->close();
