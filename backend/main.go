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

var users = []User{
	{Name: "One", Email: "one@gmail.com"},
	{Name: "Two", Email: "two@gmail.com"},
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func main() {
	a := 89
	fmt.Println("Hello World", a)

	http.HandleFunc("/users", getUsersHandler)
	fmt.Println("Server running at :8080")
	http.ListenAndServe(":8080", nil)
}
