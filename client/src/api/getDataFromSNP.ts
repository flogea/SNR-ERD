import axios from 'axios';

export async function getAllData() {
  const data = await axios.get('http://localhost:5000/api/getData');
  console.log(data.data);
  return data.data;
}

export async function getTemperature() {
  const data = await axios.get('http://localhost:5000/api/getData/temperature');
  console.log(data.data);
  return data.data;
}

export async function getHumidity() {
  const data = await axios.get('http://localhost:5000/api/getData/humidity');
  console.log(data.data);
  return data.data;
}
