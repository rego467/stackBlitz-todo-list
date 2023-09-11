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
    <div>
      <h1>search pages</h1>
      <form>
        <input
          type="text"
          value={form.search}
          name="search"
          placeholder="search you want!!"
          onChange={handleForm}
        />
        <button onClick={handleButton}>send</button>
      </form>
    </div>
  );
};

export default FormSearch;
