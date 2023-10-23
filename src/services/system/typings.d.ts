declare namespace API {
  type Captcha = {
    /** Captcha ID */
    captcha_id?: string;
  };

  type LoginForm = {
    /** Captcha verify code */
    captcha_code: string;
    /** Captcha verify id */
    captcha_id: string;
    /** Login password (md5 hash) */
    password: string;
    /** Login name */
    username: string;
  };

  type LoginToken = {
    /** Access token (JWT) */
    access_token?: string;
    /** Expired time (Unit: second) */
    expires_at?: number;
    /** Token type (Usage: Authorization=${token_type} ${access_token}) */
    token_type?: string;
  };

  type UpdateLoginPassword = {
    /** New password (md5 hash) */
    new_password: string;
    confirm_password?: string;
    /** Old password (md5 hash) */
    old_password: string;
  };

  type Menu = {
    /** Child menus */
    children?: Menu[];
    /** Code of menu (unique for each level) */
    code?: string;
    /** Create time */
    created_at?: string;
    /** Details about menu */
    description?: string;
    /** Unique ID */
    id?: string;
    /** Display name of menu */
    name?: string;
    /** Parent ID (From Menu.ID) */
    parent_id?: string;
    /** Parent path (split by .) */
    parent_path?: string;
    /** Access path of menu */
    path?: string;
    /** Properties of menu (JSON) */
    properties?: string;
    /** Resources of menu */
    resources?: MenuResource[];
    /** Sequence for sorting */
    sequence?: number;
    /** Status of menu (disabled, enabled) */
    status?: string;
    /** Type of menu (page, button) */
    type?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
    parent_name?: string;
  };

  type MenuResource = {
    /** Create time */
    created_at?: string;
    /** Unique ID */
    id?: string;
    /** From Menu.ID */
    menu_id?: string;
    /** HTTP method */
    method?: string;
    /** API request path (e.g. /api/v1/users/:id) */
    path?: string;
    /** Update time */
    updated_at?: string;
  };

  type Role = {
    /** Code of role (unique) */
    code?: string;
    /** Create time */
    created_at?: string;
    /** Details about role */
    description?: string;
    /** Unique ID */
    id?: string;
    /** Role menu list */
    menus?: RoleMenu[];
    /** Display name of role */
    name?: string;
    /** Sequence for sorting */
    sequence?: number;
    /** Status of role (disabled, enabled) */
    status?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  type RoleMenu = {
    /** Create time */
    created_at?: string;
    /** Unique ID */
    id?: string;
    /** From Menu.ID */
    menu_id?: string;
    /** From Role.ID */
    role_id?: string;
    /** Update time */
    updated_at?: string;
  };

  type User = {
    /** Create time */
    created_at?: string;
    /** Unique ID */
    id?: string;
    /** Username for login */
    username?: string;
    /** Name of user */
    name?: string;
    /** Email of user */
    email?: string;
    /** Phone number of user */
    phone?: string;
    /** Remark of user */
    remark?: string;
    /** Roles of user */
    roles?: UserRole[];
    /** Status of user (activated, freezed) */
    status?: string;
    password?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  type UserRole = {
    /** Create time */
    created_at?: string;
    /** Unique ID */
    id?: string;
    /** From Role.ID */
    role_id?: string;
    /** From Role.Name */
    role_name?: string;
    /** Update time */
    updated_at?: string;
    /** From User.ID */
    user_id?: string;
  };

  type Logger = {
    /** Create time */
    created_at?: string;
    /** Log data */
    data?: string;
    /** Unique ID */
    id?: string;
    /** Log level */
    level?: string;
    /** Log message */
    message?: string;
    /** Error stack */
    stack?: string;
    /** Log tag */
    tag?: string;
    /** Trace ID */
    trace_id?: string;
    /** User ID */
    user_id?: string;
    /** From User.Name */
    user_name?: string;
    login_name?: string;
  };
}
