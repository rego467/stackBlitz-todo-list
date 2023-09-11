import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const deleteNoteFirebase = async (id) => {
  const docRef = doc(db, 'notes', id);
  try {
    await deleteDoc(docRef);
    return { succcess: true, message: 'delete berhasil' };
  } catch (error) {
    console.error(error, 'eror');
  }
};

export default function CardTodo({ todo }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteNoteFirebase, {
    onSuccess: (data) => {
      console.log(data, 'data');
      if (data) {
        queryClient.invalidateQueries('todos');
      } else {
        console.error('error');
      }
    },
  });

  const deleteButton = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="card">
      <h1 className="h1-card">{todo.judul}</h1>
      <div className="bottom" />
      <p className="h4-card">{todo.content}</p>
      <div className="card-button">
        <div>
          <button className="button" onClick={() => deleteButton(todo.id)}>
            delete todo
          </button>
        </div>
        <div className="link-edit">
          <Link to={`/edit/${todo.id}`} state={{ todo: todo }} className="link">
            edit todo
          </Link>
        </div>
      </div>
    </div>
  );
}
