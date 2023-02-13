import axios from "axios";

export const Home = () => {
  getTestsFromServer()
  getTestsFromServer2()
  return (
    <div className="home__page">
      <div>
        <h1>Gribēju uztaisīt, blogu kur mainīties ar domu graudiem</h1>
        <h1>šeit notestēsim, kas ielādējās un kas nē</h1>
      </div>
    </div>
  );
};

export default Home;

const getTestsFromServer = () => {
  axios.get(`http://localhost:3004/`).then((res) => {
    console.log("res" , res.data);
  })
}

const getTestsFromServer2 = () => {
  axios.get(`http://localhost:3004/posts/2`).then((res) => {
    console.log("res2" , res.data);
  })
}
