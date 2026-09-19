/*
CREATE TABLE IF NOT EXISTS web_browser_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,

    token TEXT NOT NULL UNIQUE,
    session_status TEXT NOT NULL CHECK(session_status IN ('activated', 'deactivated', 'blocked', 'banned')),

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL
);

*/

export interface InsertWebBrowserSession {
  public_id: string;

  token: string;
  session_status: "activated" | "deactivated" | "blocked" | "banned";
  expires_at: string;
};

export interface SelectWebBrowserSession {
  id: number;
  public_id: string;

  token: string;
  session_status: "activated" | "deactivated" | "blocked" | "banned";
  created_at: string;
  expires_at: string;
};

export interface UpdateWebBrowserSession {
  id: number;

  session_status: "activated" | "deactivated" | "blocked" | "banned";
  expires_at: string;
};

export interface InsertWebBrowserSession {
  id: number;
};