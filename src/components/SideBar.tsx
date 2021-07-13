import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
//https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1
interface SideBarProps {
  id: number;
  onGenreChange(id: number): void;
}
export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  return (<nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => { props.onGenreChange(genre.id) }}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>)
}