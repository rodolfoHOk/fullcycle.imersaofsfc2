export interface Position {
  lat: number;
  long: number;
}

export interface Route {
  _id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}
