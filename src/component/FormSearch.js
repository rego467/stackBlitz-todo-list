import React, { useState } from 'react';

const FormSearch = ({ setTextForm }) => {
  const [form, setForm] = useState({
    search: '',
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleButton = () => {
    setTextForm(form.search);
  };

  return (
    <div className="container-search">
      <div className="search">
        <input
          type="text"
          value={form.search}
          name="search"
          placeholder="search you want!!"
          onChange={handleForm}
          className="inputs"
        />
        <button onClick={handleButton} className="buttons">
          send
        </button>
      </div>
    </div>
  );
};

export default FormSearch;
