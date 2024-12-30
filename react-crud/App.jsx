import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List'

function App() {
  // inputs객체의 초기상태(여기에 입력정보를 저장)
  // 실시간정보
  const [inputs, setInputs] = useState({item:"",cost:""});
  
  // submit 눌렀을때 적용할 정보
  const [results, setResults] = useState([]);

  // edit 눌렀을때 적용할 내용
  const [editingId, setEditingId] = useState(null);
  const [editInputs, setEditInputs] = useState({item:"", cost:""})

  const handleInputChange = (e) => {
    // input(입력창)의 name과 value를 가져오겠다.
    const {name, value} = e.target; 
    
    // inputs(객체)에 정보를 넣어준다.
    setInputs((prev) => ({...prev, [name]:value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      id: Date.now(),
      item: inputs.item,
      cost: Number(inputs.cost),
    }

    setResults((prevList) => [...prevList,newData]);
    setInputs({item:"", cost:""});
  }

  // 삭제버튼
  const handleDelete = (id) => {
    setResults((prevDataList) => 
      prevDataList.filter((data) => data.id !== id))
  }

  // 수정기능
  const handleEdit = (id, updatedData) => {
    setResults((prevResults) => 
      prevResults.map((result) => 
        result.id === id ? {...result,...updatedData} : result))
  }

  // 합산기능
  const totalCost = results.reduce((acc,result) => acc+result.cost,0)

  // 모두지우기
  const handleClearAll = () => {
    setResults([]);
  }

  return (
    <div className='container'>
      
      <List 
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}/>

      <div className='result-form'>
        {results.map((result) => (
          <div key={result.id} className='result-con'>
            {editingId === result.id ? (
              //수정 중일 때
              <div className='edit-input'>
                <input
                  type="text"
                  value={editInputs.item}
                  onChange={(e) => 
                    setEditInputs({...editInputs, item:e.target.value})}></input>
                <input
                  type="number"
                  value={editInputs.cost}
                  onChange={(e) => 
                    setEditInputs({...editInputs, cost:Number(e.target.value)})}></input>
                  <button onClick={() => { 
                    handleEdit(result.id, editInputs);
                    setEditingId(null)}}>완료</button>
              </div>
            ) : (

              //일반 상태
              <div className='result-container'>
                <div className='result-item'>
                  <div>항목: {result.item} </div>
                  <div>비용: {result.cost} </div>

                </div>
                <div className='result-cost'>
                </div>

                <button 
                className='material-icons edit-btn'
                onClick={() => {
                  setEditingId(result.id);
                  setEditInputs({item:result.item, cost:result.cost})}}
                >edit</button>

                <button 
                className='material-icons delete-btn'
                onClick={() => handleDelete(result.id)}>delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='total-cost'>
        <button onClick={handleClearAll}>모두 지우기
          <span className='material-icons'>delete</span>
        </button>
        <h4>총 비용: {totalCost}</h4>
      </div>
    </div>
  )
}

export default App
