import { db, auth } from "./Firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const coleccionUsuarios = collection(db, 'usuarios');

export const agregarUsuario = async (usuario: { nombre: string; contrasena: string }) => {
  try {
    // esta parte agrega el usuario basado en la funcion de autenticacion que tiene Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, `${usuario.nombre}@algo.com`, usuario.contrasena);
    const user = userCredential.user;

    // guarda el usuario en la base de firebase
    const docRef = await addDoc(coleccionUsuarios, usuario);
    return docRef.id;
  } catch (error) {
    console.error("Error agregando el usuario: ", error);
    throw new Error("Error agregando el usuario.");
  }
};
// como dice la const esta toma los datos que se ingresaron en el form
export const obtenerUsuarios = async () => {
  try {
    const snapshot = await getDocs(coleccionUsuarios);
    const usuarios = snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, nombre: data.nombre, contrasena: data.contrasena };
    });
    return usuarios;
  } catch (error) {
    console.error("Error obteniendo los usuarios: ", error);
    throw new Error("Error obteniendo los usuarios.");
  }
};
// lo mismo pero para actualizar los datos
export const actualizarUsuario = async (id: string, usuarioActualizado: { nombre: string; contrasena: string }) => {
  try {
    const usuarioDoc = doc(db, 'usuarios', id);
    await updateDoc(usuarioDoc, usuarioActualizado);
    return true;
  } catch (error) {
    console.error("Error actualizando el usuario: ", error);
    throw new Error("Error actualizando el usuario.");
  }
};
// la logica del boton eliminar
export const eliminarUsuario = async (id: string) => {
  try {
    const usuarioDoc = doc(db, 'usuarios', id);
    await deleteDoc(usuarioDoc);
    return true;
  } catch (error) {
    console.error("Error eliminando el usuario: ", error);
    throw new Error("Error eliminando el usuario.");
  }
};
// logica tambien del inicio solo que obvia el correo por que es solo nombre y contraseña
export const iniciarSesion = async (nombre: string, contrasena: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, `${nombre}@algo.com`, contrasena);
    return userCredential.user;
  } catch (error) {
    console.error("Error iniciando sesión: ", error);
    throw new Error("Credenciales incorrectas.");
  }
};
