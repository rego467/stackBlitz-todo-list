import React, { useState, useEffect } from 'react';
import './edit.css';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { db } from '../firebase';
import { useMutation } from 'react-query';
import { doc, updateDoc } from 'firebase/firestore';
import Footer from '../component/Footer';

const editNote = async (id, updateNote) => {
  const docRef = doc(db, 'notes', id);
  await updateDoc(docRef, updateNote);
};

export default function EditTodo() {
  const [input, setInput] = useState({
    judul: '',
    content: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  let location = useLocation();

  useEffect(() => {
    setInput({
      ...input,
      judul: location.state.todo.judul,
      content: location.state.todo.content,
    });
  }, []);

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutation((updateNote) => editNote(id, updateNote), {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.log(error), 'eror';
    },
  });

  // const handleEdit = () => {
  //   // pertama filter todos array
  //   let cekFilter = todos.filter((todo) => {
  //     return todo.id === id;
  //   });

  //   // kedua lakukan update dengan melakukan metode map
  //   if (cekFilter) {
  //     const mapTodo = todos.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, ...input };
  //       }
  //       return item;
  //     });
  //     setTodos(mapTodo);
  //     navigate('/');
  //   }
  // };

  const handleEdit = async () => {
    const newUpdate = { ...input };
    mutation.mutate(newUpdate);
  };

  const buttonBack = () => {
    navigate('/');
  };

  return (
    <div className="container-edit">
      <div className="link-form">
        <a className="a" onClick={buttonBack}>
          back to home
        </a>
      </div>
      <div className="main">
        <div className="form-input">
          <input
            type="text"
            name="judul"
            value={input.judul}
            placeholder="judul"
            onChange={(e) => handleInput(e)}
          />
          <textarea
            className=""
            rows="6"
            type="text"
            name="content"
            value={input.content}
            placeholder="content"
            onChange={(e) => handleInput(e)}
          />
          <button onClick={handleEdit} className="button-create">
            edit
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
