package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	users := []User{
		{Name: "One", Email: "one@gmail.com"},
		{Name: "Two", Email: "two@gmail.com"},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func main() {
	http.HandleFunc("/users", getUsersHandler)
	fmt.Println("Server running at :8080")
	http.ListenAndServe(":8080", nil)
}
