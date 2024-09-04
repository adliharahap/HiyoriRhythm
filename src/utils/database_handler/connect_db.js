// database.js
import SQLite from 'react-native-sqlite-storage';

// Inisialisasi database
const db = SQLite.openDatabase(
  {
    name: 'PlaylistDB',
    location: 'default',
  },
  () => {
    console.log('Database connected successfully');
  },
  error => {
    console.log('Error connecting to database: ', error);
  },
);

// Fungsi untuk membuat tabel
export const createTables = () => {
  db.transaction(tx => {
    // Membuat tabel playlists
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL
      );`,
      [],
      () => {
        console.log('Table playlists created successfully');
        insertDefaultFavoritePlaylist();
      },
      error => {
        console.log('Error creating playlists table: ', error);
      },
    );

    // Membuat tabel playlist_songs
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS playlist_songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playlist_id INTEGER NOT NULL,
        song_path TEXT NOT NULL,
        FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
      );`,
      [],
      () => {
        console.log('Table playlist_songs created successfully');
      },
      error => {
        console.log('Error creating playlist_songs table: ', error);
      },
    );
  });
};

const insertDefaultFavoritePlaylist = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM playlists WHERE name = ?;',
      ['FavoriteMusic'],
      (tx, results) => {
        if (results.rows.length === 0) {
          tx.executeSql(
            'INSERT INTO playlists (name) VALUES (?);',
            ['FavoriteMusic'],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log('Default playlist "FavoriteMusic" added successfully');
              } else {
                console.log('Failed to add default playlist "FavoriteMusic"');
              }
            },
            error => {
              console.log('Error adding default playlist "FavoriteMusic": ', error);
            },
          );
        } else {
          console.log('Default playlist "FavoriteMusic" already exists');
        }
      },
      error => {
        console.log('Error checking for default playlist "FavoriteMusic": ', error);
      },
    );
  });
};
