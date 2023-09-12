import React, { useState } from 'react';
import random from '../random';
import './create.css';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const addNewNote = async (newNote) => {
  const docRef = await addDoc(collection(db, 'notes'), newNote);
  return { ...newNote, id: docRef.id };
};

export default function CreateTodo() {
  const [input, setInput] = useState({
    judul: '',
    content: '',
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const arr = [1, 2, 3, 4, 5, 6];

  // const handleFormCreate = (e) => {
  //   e.preventDefault();
  //   setTodos([...todos, { id: random(arr), ...input }]);
  //   navigate('/');
  // };

  const mutation = useMutation({
    mutationFn: addNewNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.log(error, 'eror');
    },
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const sendTodo = async (e) => {
    e.preventDefault();
    const newNote = { ...input };
    mutation.mutate(newNote);
    navigate('/');
  };

  return (
    <div className="container-create">
      <div className="link-create">
        <Link to={'/'} className="button-link">
          back to home
        </Link>
      </div>
      <div className="main-form">
        <form action="">
          <input
            type="text"
            name="judul"
            value={input.judul}
            placeholder="judul"
            onChange={(e) => handleInput(e)}
          />
          <textarea
            rows="8"
            type="text"
            name="content"
            value={input.content}
            placeholder="create your content"
            onChange={(e) => handleInput(e)}
          />
          <button className="button-create" onClick={sendTodo}>
            create
          </button>
        </form>
      </div>
    </div>
  );
}
