export interface InsertWebBrowserSessionData {
  public_id: string;

  web_browser_sessions_id: number;
  acumuled_points: number;
  session_name: string;
};

export interface SelectWebBrowserSessionData {
  id: number;
  public_id: string;

  web_browser_sessions_id: number;
  acumuled_points: number;
  session_name: string;
};

export interface UpdateWebBrowserSessionData {
  id: number;

  web_browser_sessions_id: number;
  acumuled_points: number;
  session_name: string;
};

export interface DeleteWebBrowserSessionData {
  id: number;
};