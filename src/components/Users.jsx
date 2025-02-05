import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import db from "../config/firebase.config";
import { useState } from "react";
import UserForm from "./UserForm";

const Users = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setFormOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({});

  const { mutate: mutateUpdateUser } = useMutation({
    mutationFn: (payload) =>
      updateDoc(doc(db, "users", userToUpdate.id), payload),
    onSuccess: () => {
      setFormOpen((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: mutateAddUser } = useMutation({
    mutationFn: (payload) => addDoc(collection(db, "users"), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getDocs(collection(db, "users")),
  });

  const { mutate: deleteUser, isLoading: isLoadingDeleteUser } = useMutation({
    mutationFn: (documentId) => deleteDoc(doc(db, "users", documentId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) {
    return <p>Cargando</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <>
      {/* Add form */}
      <UserForm
        isFormOpen={!isFormOpen}
        onSubmit={(data) => {
          mutateAddUser(data);
        }}
        text="Add form"
      />
      {/* Update Form */}
      <dialog open={isFormOpen}>
        <button
          onClick={() => {
            setFormOpen(false);
          }}
        >Close Form</button>
        <UserForm
          isFormOpen={isFormOpen}
          onSubmit={(data) => {
            mutateUpdateUser(data);
          }}
          text="Update form"
        />
      </dialog>
      <h1>Users</h1>
      {data.docs.map((doc) => {
        const user = doc.data();

        return (
          <div key={doc.id}>
            <p>
              {user.first} - {user.last} - {user.born}
            </p>
            <button
              onClick={() => {
                setUserToUpdate({
                  id: doc.id,
                  ...doc.data(),
                });
                setFormOpen(true);
              }}
            >
              Update User
            </button>
            {!isLoadingDeleteUser ? (
              <button onClick={() => deleteUser(doc.id)}>Borrar</button>
            ) : (
              <p>Está borrando</p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Users;
