package main

import (
	"os"
)

// get the language of the user's machine
func GetUserMachineLanguage() string {
	// for Unix-based systems
	lang := os.Getenv("LANG")
	if lang == "" {
		lang = os.Getenv("LC_ALL")
	}
	if lang == "" {
		lang = os.Getenv("LC_MESSAGES")
	}
	return lang
}
