CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    word TEXT NOT NULL,
    difficult_level TEXT NOT NULL CHECK(difficult_level IN ('easy', 'median', 'hard'))
);

CREATE TABLE IF NOT EXISTS words_tips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    word_id INTEGER NOT NULL,
    word_tip TEXT NOT NULL,
    
    FOREIGN KEY(word_id)
        REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS words_explanation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    word_id INTEGER NOT NULL,
    word_explanation TEXT NOT NULL,
    word_origin TEXT NOT NULL,

    FOREIGN KEY(word_id)
        REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS crosswords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    crossword_title TEXT NOT NULL,
    crossword_description TEXT NOT NULL,

    crossword_grid TEXT NOT NULL,
    crossword_solution TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS crosswords_words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    crossword_id INTEGER NOT NULL,
    word_id INTEGER NOT NULL,

    word_column INTEGER NOT NULL,
    word_line INTEGER NOT NULL,
    word_direction TEXT NOT NULL CHECK(word_direction IN ('horizontal', 'vertical')),

    FOREIGN KEY(crossword_id)
        REFERENCES crosswords(id),

    FOREIGN KEY(word_id)
        REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS web_browser_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    token TEXT NOT NULL UNIQUE,
    session_status TEXT NOT NULL CHECK(session_status IN ('activated', 'deactivated', 'blocked', 'banned')),

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_browser_sessions_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,
    
    web_browser_sessions_id INTEGER NOT NULL UNIQUE,
    session_name TEXT NOT NULL,
    acumuled_points INTEGER NOT NULL,
    
    FOREIGN KEY(web_browser_sessions_id)
        REFERENCES web_browser_sessions(id)
);

-- index and others....

CREATE INDEX idx_words_difficult_level
ON words(difficult_level);

CREATE INDEX idx_words_tips_word_id
ON words_tips(word_id);

CREATE INDEX idx_words_explanation_word_id
ON words_explanation(word_id);

CREATE INDEX idx_crosswords_words_crossword_id
ON crosswords_words(crossword_id);

CREATE INDEX idx_crosswords_words_word_id
ON crosswords_words(word_id);

CREATE INDEX idx_sessions_status
ON web_browser_sessions(session_status);

CREATE INDEX idx_sessions_expires_at
ON web_browser_sessions(expires_at);

CREATE INDEX idx_sessions_data_session_id
ON web_browser_sessions_data(web_browser_sessions_id);

-- by Abadi