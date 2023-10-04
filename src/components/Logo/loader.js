import React, { useState, useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Loader() {
  const [setIsLoading, E] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://login-app-api-ap19.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  let [color] = useState("#0DF7F5");

  return (
    <div className="loader">
      {setIsLoading ? (
        <ClimbingBoxLoader color={color} loading={setIsLoading} size={20} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Loader;
