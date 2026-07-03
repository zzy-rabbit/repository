package model

type Repository struct {
	Identify
	Files        []string `json:"files"`
	Password     string   `json:"password"`
	Title        string   `json:"title"`
	Text         string   `json:"text"`
	CreateAt     int64    `json:"create_at"`
	ExpireAt     int64    `json:"expire_at"`
	ExtractCount int64    `json:"extract_count"`
	RatingCount  int64    `json:"rating_count"`
	RatingSum    int64    `json:"rating_sum"`
}

type RepositoryCondition struct {
	*PageQuery
	IDs          []string `json:"ids"`
	ExpireAfter  int64    `json:"expire_after"`
	ExpireBefore int64    `json:"expire_before"`
}

type RepositoryFilesCondition struct {
	Identify
	Password string `json:"password"`
	//SecretKey string `json:"secret_key"`
}

type Comment struct {
	Identify
	Repository string   `json:"repository"`
	Content    string   `json:"content"`
	IP         string   `json:"ip"`
	UserAgent  string   `json:"user_agent"`
	Locations  []string `json:"locations"`
	Time       int64    `json:"time"`
}

type CommentCondition struct {
	*PageQuery
	IDs          []string `json:"ids"`
	Repositories []string `json:"repositories"`
}

type Rating struct {
	Identify
	Password string `json:"password"`
	Rating   int    `json:"rating"`
}
