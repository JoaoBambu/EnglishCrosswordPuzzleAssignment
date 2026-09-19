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

export interface DeleteWebBrowserSession {
  id: number;
};