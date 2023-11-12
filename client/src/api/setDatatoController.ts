import axios from 'axios';

export async function setNewTemp(oid: string, newTemp: number) {
  axios
    .post(
      'http://localhost:5000/api/setData/newTemp',
      { oid, newTemp },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      },
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
