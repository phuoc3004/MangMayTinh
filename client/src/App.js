import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [appName, setAppName] = useState("");
  const [password, setPassword] = useState("");
  const [appPasswordList, setAppList] = useState([]); 
  const [newPassword, setNewPassword] = useState("");


  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setAppList(response.data);
    });
  },[]);
  const submitPassword = ()=>{
    Axios.post('http://localhost:3001/api/insert',{
      appName: appName, 
      appPassword: password,
    });
    setAppList([
      ...appPasswordList, 
      {appName: appName, appPassword: password},
    ]);
  };
  const deletePassword = (apple)=>{
    Axios.delete(`http://localhost:3001/api/delete/${apple}`);
  };
  const updatePassword = (apple)=>{
    Axios.put("http://localhost:3001/api/update",{
      appName: apple, 
      appPassword: newPassword,
    });
    setNewPassword("");
  };


  return (
    <div className="App">

      <h1 className="title">Quản Lý Mật Khẩu</h1>

      <div className="home">

        <div className="submitform">

          <label className="form-label">Ứng dụng</label>

          <input type="text" name="movieName" onChange={(e)=>{
            setAppName(e.target.value)
          }}/>

          <label className="form-label">Mật khẩu</label>

          <input type="text" name="review" onChange={(e)=>{
            setPassword(e.target.value)
          }}/>

          <button className="form-button" onClick={submitPassword}>Submit</button>
          

        </div>

        {appPasswordList.map((val) => {

          return (

          <div className="card">

            <h1>{val.appName}</h1>
            <p>{val.appPassword}</p>

            <button className="sub-button" onClick={() => {  
              deletePassword(val.appName);
              }}
              >Delete
            </button>

            <input type="text" id="updateInput" onChange={(e)=>{
              setNewPassword(e.target.value)
            }}/>

            <button className="sub-button" onClick={() => {
              updatePassword(val.appName);
              }}
              >Update
              </button>

          </div>
          )
        })}
      </div> 
    </div>
  );
}

export default App;
