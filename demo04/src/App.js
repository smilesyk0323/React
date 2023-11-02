import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Jumbotron from './components/Jumbotron';




function App() {
  return (
    <div>
        {/* 점보트론을 만들면서 제목과 내용을 전달 */}
        <Jumbotron title="일정 관리 프로그램" content="KH정보교육원 수업자료"/>
        
        <TodoList/>

    </div>
  );
}

export default App;
