//verificamos si el navegador soporta service-workers
if ('serviceWorker' in navigator && 'PushManager' in window) {
//registramos el service worker
navigator.serviceWorker.register('service-Worker.js')
.then((registration) => {
	console.log('service Worker registrado con exito.',registration);

	//solicitamos el permiso para la notificacion
	return Notification.requestPermission();
 })

.then(permission =>{
	if(permission === 'granted'){
		console.log('Permiso de notificaciones concedido');


		//Agregamos la notificacion push de la API que estariamos usando
		return navigator.serviceWorker.ready;
	}else{
		console.log('Permiso de notificacion denegado');
	}
})

.then(swRegistration =>{
	//Aqui deberia ir la suscripcion a la API que quieres usar.
})


.catch((error) => {
	console.log('Error en el registro del service worker', error);
	});
}