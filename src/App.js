import './App.css';
import Log from './components/Log'
import { useState, useEffect } from 'react';
import namesFile from './first-names.txt'

function App() {
  const [logData, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('/log')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(JSON.parse(data))
        }).catch((err) => {
          console.error('Error fetching data:', err);
        });
    }

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const [name, setName] = useState("")
  const [id, setID] = useState(Math.floor(Math.random() * 10000).toString())
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(namesFile)
      .then((r) => r.text())
      .then((l) => {
        const ll = l.split(/\r?\n/)
        setList(ll)
        setName(ll[ Math.floor(Math.random() * ll.length)-1])
      });
  }, []);

  const submit = () => {
    fetch("/job", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        by: name,
      }),
    }
    ).then(() => {
      setName(list[Math.floor(Math.random() * list.length )-1])
      setID((Math.floor(Math.random() * 10000).toString()))
    })

  }

  return (
    <div className="App">
      <form>
        <label>Name:</label><input value={name} onChange={e => setName(e.target.value)} /><br />
        <label>ID:</label><input value={id} onChange={e => setID(e.target.value)} /><br />
        <input type="button" value="submit" onClick={submit} />
      </form>
      <Log data={logData} /><br />
    </div>
  );
}

export default App;

