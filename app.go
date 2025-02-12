package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// before closing the app
func (a *App) BeforeClose(ctx context.Context) (prevent bool) {
	response, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "Quit ?",
		Message:       "Are you sure you want to quit?",
		Buttons:       []string{"Cancel", "Quit"},
		DefaultButton: "Cancel",
	})
	if err != nil {
		runtime.LogError(ctx, "Error showing dialog: "+err.Error())
		return false
	}
	// 	prevent closing if the user clicked "cancel"
	return response == "Cancel"
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type UserPreferences struct {
	Language string `json:"language"`
	Theme    string `json:"theme"`
}

// SavePreferences saves the user preferences to a file
func (a *App) SavePreferences(pref UserPreferences) error {
	// Load the current preferences (if any)
	currentPref, err := a.GetPreferences()
	if err != nil {
		return err
	}

	// Update only the passed fields
	if pref.Language != "" {
		currentPref.Language = pref.Language
	}
	if pref.Theme != "" {
		currentPref.Theme = pref.Theme
	}

	// Marshal the updated preferences
	data, err := json.Marshal(currentPref)
	if err != nil {
		return err
	}

	// Save the updated preferences back to the file
	return os.WriteFile("preferences.json", data, 0644)
}

// GetPreferences loads the user preferences from a file
func (a *App) GetPreferences() (UserPreferences, error) {
	var pref UserPreferences

	// Check if the preferences file exists
	_, err := os.Stat("preferences.json")
	if os.IsNotExist(err) {
		// If the file does not exist, return default preferences
		return UserPreferences{
			Language: "en",
			Theme:    "light",
		}, nil
	} else if err != nil {
		return pref, err
	}

	// If the file exists, read it
	file, err := os.Open("preferences.json")
	if err != nil {
		return pref, err
	}
	defer file.Close()

	data, _ := io.ReadAll(file)
	err = json.Unmarshal(data, &pref)
	return pref, err
}
