import React, { useState, useEffect } from 'react';
import CardTodo from '../pages/CardTodo';
import EditTodo from '../pages/EditTodo';
import Navbar from '../component/Navbar';
import { db } from '../firebase';

import { useQuery } from 'react-query';
import { collection, getDocs } from 'firebase/firestore';
import Footer from '../component/Footer';

const fetchNotes = async () => {
  const querySnapshot = await getDocs(collection(db, 'notes'));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['notes'],
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

  return (
    <div className="container">
      <Navbar />

      <div className="main">
        {data.map((note) => {
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
