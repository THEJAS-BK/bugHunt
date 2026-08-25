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

func addUsersHandler(w http.ResponseWriter, r *http.Request) {
	users = append(users, User{Name: "three", Email: "three@gmail.com"})
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(users)
}

func main() {
	http.HandleFunc("/users", getUsersHandler)
	http.HandleFunc("/users", addUsersHandler)
	fmt.Println("Server running at :8080")
	http.ListenAndServe(":8080", nil)
}
