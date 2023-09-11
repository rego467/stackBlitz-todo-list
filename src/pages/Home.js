import React, { useState, useEffect } from 'react';
import CardTodo from '../pages/CardTodo';
import Navbar from '../component/Navbar';
import { db } from '../firebase';
import FormSearch from '../component/FormSearch';

import { useQuery } from 'react-query';
import { collection, getDocs } from 'firebase/firestore';
import Footer from '../component/Footer';

const fetchNotes = async () => {
  const querySnapshot = await getDocs(collection(db, 'notes'));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const Home = () => {
  const [textForm, setTextForm] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['notes', textForm],
    queryFn: fetchNotes,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }

  if (error) {
    return <h1>eror:{error.message}</h1>;
  }

  console.log(textForm, 'from');
  return (
    <div className="container">
      <Navbar />
      <div>
        <FormSearch setTextForm={setTextForm} />
      </div>
      <div className="main">
        {data
          .filter(
            (note) =>
              note.judul.includes(textForm) || note.content.includes(textForm)
          )
          .map((note) => {
            return (
              <div key={note.id} className="main-card">
                <CardTodo todo={note} />
              </div>
            );
          })}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};
export default Home;
