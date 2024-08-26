import SQLite from 'react-native-sqlite-storage';

// Fungsi untuk membuka database dan membuat tabel
export const openDatabaseAndCreateTables = () => {
  const db = SQLite.openDatabase(
    {
      name: 'music_db.db',
      location: 'default', // Ini membuka database dari lokasi default
    },
    () => console.log('Database berhasil dibuka'),
    error => console.error('Error: ', error)
  );

  db.transaction(tx => {
    // Membuat tabel jika tidak ada
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS genres (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS artists (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        genre_id TEXT,
        biography TEXT,
        country TEXT,
        FOREIGN KEY (genre_id) REFERENCES genres(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS music_tracks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        duration INTEGER NOT NULL,
        artist_id TEXT,
        file_path TEXT NOT NULL,
        genre_id TEXT,
        year INTEGER,
        play_count INTEGER DEFAULT 0,
        FOREIGN KEY (artist_id) REFERENCES artists(id),
        FOREIGN KEY (genre_id) REFERENCES genres(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS playlists (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        profile_id TEXT,
        description TEXT,
        is_public BOOLEAN NOT NULL CHECK (is_public IN (0, 1)),
        FOREIGN KEY (profile_id) REFERENCES profiles(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS playlist_tracks (
        playlist_id TEXT,
        track_id TEXT,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        track_order INTEGER, -- renamed the column from 'order'
        PRIMARY KEY (playlist_id, track_id),
        FOREIGN KEY (playlist_id) REFERENCES playlists(id),
        FOREIGN KEY (track_id) REFERENCES music_tracks(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS user_favorites (
        profile_id TEXT,
        track_id TEXT,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (profile_id, track_id),
        FOREIGN KEY (profile_id) REFERENCES profiles(id),
        FOREIGN KEY (track_id) REFERENCES music_tracks(id)
      );
    `);
  }, error => {
    console.error('Transaction error: ', error);
  }, () => {
    console.log('Tables created or already exist.');
  });

  return db;
};

export const insertTestData = (db) => {
    db.transaction(tx => {
      // Insert data ke tabel genres
      tx.executeSql(`
        INSERT INTO genres (id, name) VALUES
        ('1', 'Rock'),
        ('2', 'Pop'),
        ('3', 'Jazz');
      `);
  
      // Insert data ke tabel profiles
      tx.executeSql(`
        INSERT INTO profiles (id, name) VALUES
        ('1', 'John Doe'),
        ('2', 'Jane Smith');
      `);
  
      // Insert data ke tabel artists
      tx.executeSql(`
        INSERT INTO artists (id, name, genre_id, biography, country) VALUES
        ('1', 'The Rolling Stones', '1', 'Legendary rock band.', 'UK'),
        ('2', 'Taylor Swift', '2', 'Popular pop singer.', 'USA');
      `);
  
      // Insert data ke tabel music_tracks
      tx.executeSql(`
        INSERT INTO music_tracks (id, title, duration, artist_id, file_path, genre_id, year) VALUES
        ('1', 'Paint It Black', 180, '1', 'path/to/paint_it_black.mp3', '1', 1966),
        ('2', 'Blank Space', 210, '2', 'path/to/blank_space.mp3', '2', 2014);
      `);
  
      // Insert data ke tabel playlists
      tx.executeSql(`
        INSERT INTO playlists (id, name, profile_id, description, is_public) VALUES
        ('1', 'Rock Classics', '1', 'A playlist of classic rock songs.', 1),
        ('2', 'Top Hits', '2', 'Current top hits.', 0);
      `);
  
      // Insert data ke tabel playlist_tracks
      tx.executeSql(`
        INSERT INTO playlist_tracks (playlist_id, track_id, track_order) VALUES
        ('1', '1', 1),
        ('2', '2', 1);
      `);
  
      // Insert data ke tabel user_favorites
      tx.executeSql(`
        INSERT INTO user_favorites (profile_id, track_id) VALUES
        ('1', '1'),
        ('2', '2');
      `);
    }, error => {
      console.error('Transaction error: ', error);
    }, () => {
      console.log('Test data inserted.');
    });
  };
