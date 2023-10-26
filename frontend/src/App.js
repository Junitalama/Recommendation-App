
import './App.css';
import MovieList from './Components/MovieList';
import BookList from './Components/BookList';
import VideoList from './Components/VideoList';

function App() {
  return (
    <div>
      <h3>Recommendations</h3>
      <div className="App">
        <MovieList />
        <BookList />
        <VideoList />
      </div>
    </div>
  );
}

export default App;
