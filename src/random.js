import React from 'react';

export default function random(random) {
  let result = '';
  for (let i = 0; i < random.length; i++) {
    const mathRandom = Math.floor(Math.random() * random.length);
    result = result + mathRandom;
  }
  return result;
}
