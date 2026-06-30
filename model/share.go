package model

type Share struct {
	Identify
	Files    []string `json:"files"`
	Password string   `json:"password"`
	Title    string   `json:"title"`
	Text     string   `json:"text"`
	CreateAt int64    `json:"create_at"`
	ExpireAt int64    `json:"expire_at"`
}

type ShareCondition struct {
	*PageQuery
	IDs          []string `json:"ids"`
	ExpireAfter  int64    `json:"expire_after"`
	ExpireBefore int64    `json:"expire_before"`
}

type ShareFilesCondition struct {
	Identify
	Password string `json:"password"`
	//SecretKey string `json:"secret_key"`
}

type Comment struct {
	Identify
	Share     string   `json:"share"`
	Content   string   `json:"content"`
	IP        string   `json:"ip"`
	UserAgent string   `json:"user_agent"`
	Locations []string `json:"locations"`
	Time      int64    `json:"time"`
}

type CommentCondition struct {
	*PageQuery
	IDs    []string `json:"ids"`
	Shares []string `json:"shares"`
}
