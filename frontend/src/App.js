import './App.css';
import TodoDetails from './components/TodoDetails';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <TodoDetails />
      <TodoList />
    </div>
  );
}

export default App;
