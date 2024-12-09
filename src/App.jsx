import { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const countIncrease=()=>{
    setCount (count+1);
  }
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); 
      })
      .catch((error) => {
        console.log('failed', error);
      });
  }, []);
  console.log(posts)

  const divStyle = {
    width:"300px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    gap:"100px",
    
  };
  const items={
    width:"100%"
  }
  
  return (
    <div style={items}>
      <div style={{display:"flex", justifyContent: "space-around", alignItems: "center", backgroundColor:"skyblue", padding:"10px" }}>
        <nav>my Shopping</nav>
        <button>cart <span >{count}</span></button>
      </div>
      
      <ul style={{display:"flex"}}>
        { 
          posts.map((dat) => {
            return <li key={dat.id } style={{display:"flex", margin:"20px", backgroundColor:"violet"}}>
              <div style={divStyle}>
                <img src={dat.image} alt={dat.title} style={{ width: "200px", height: "200px",}} />
                <h3>{dat.title}</h3>
                <h3>{dat.price}</h3>
                <p>{dat.description}</p>
                <h3>{dat.category}</h3>
                <button onClick={countIncrease} style={{backgroundColor:"skyblue", padding:"10px"}}>Add to Card</button>
                <span>{dat.rating[0]}{dat.rating[1]}</span>
              </div>
            </li>;
          })
        }     
      </ul>
    </div>
  );
};


export default App;
