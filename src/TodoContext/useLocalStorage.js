import React from 'react';

function useLocalStorage(itemName, initialValue) { //este C.H. me sirve para guardar más cosas en el local storage además de los todos
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true); //un estado de carga que me dice si el initialValue es un array vacío porque el localStorage está vacío o si está vacío porque aún se está cargando la solicitud a la LS.
  const [error, setError] = React.useState(false);

  //useEfect para las solicitudes a localStorage
  React.useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName); //me trae el default todos stringifiado

    let parsedItem; //se llama item y no todo pq el useLocalStorage puede obtener no solo todo sino más cosas

    if (!localStorageItem) {
      localStorage.setItem(itemName, JSON.stringify(initialValue)); //si no existe nada, crea una versión en local storage
      parsedItem = initialValue; //le asigno valor para que no me arroje error
    } else {
      parsedItem = JSON.parse(localStorageItem) //si existe, lo parsea y lo define como parsed Item

      setItem(parsedItem); //y le asigna al array el valor del localStorage
    }
 
    setLoading(false);
    
    } catch(error) {
      setLoading(false);
      setError(true)
    }
  }, [])

  //Acá se creaba antes el estado item, setItem. Lo mande paraa arriba por el useEfect. Se creaba un estado de item (lo que antes era todos y setTodos) y le da el valor que tiene el todo en el localStorage, por lo tanto, item va a tener el valor que antes tenía defaulTodos

 
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));

    setItem(newItem);
  } //esta función actualiza el estado y el LS

    return {item, saveItem, loading, error, }
}


// const defaultTodos = [
//   {text: 'Leer la biografía de Ricardo Arjona', completed: true},
//   {text: 'Seguir en instagram a Ricardo Arjona', completed: true},
//   {text: 'Comprar pan', completed: false},
//   {text: 'Stalkear a Ricardo Arjona', completed: false},
//   {text: 'Dejar de seguir en instagram a Ricardo Arjona', completed: false}
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1')

export { useLocalStorage };