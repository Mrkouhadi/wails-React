package main

import (
	"context"
	"encoding/json"
	"io"
	"os"
	"path/filepath"

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

// handle User prefrences (language, theme, .....)
// UserPreferences holds user-specific settings
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

	// Update only the provided fields
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

	// Determine the path to the preferences file
	filePath, err := a.getPreferencesFilePath()
	if err != nil {
		return err
	}

	// Ensure the directory exists
	if err := os.MkdirAll(filepath.Dir(filePath), 0755); err != nil {
		return err
	}

	// Save the updated preferences to the file
	return os.WriteFile(filePath, data, 0644)
}

// GetPreferences loads the user preferences from a file
func (a *App) GetPreferences() (UserPreferences, error) {
	var pref UserPreferences

	// Determine the path to the preferences file
	filePath, err := a.getPreferencesFilePath()
	if err != nil {
		return pref, err
	}

	// Check if the preferences file exists
	_, err = os.Stat(filePath)
	if os.IsNotExist(err) {
		// get the machine language
		l := GetUserMachineLanguage()
		Language := l[:2]
		if Language == "" {
			Language = "en"
		}
		return UserPreferences{
			Language: Language,
			Theme:    "light",
		}, nil
	} else if err != nil {
		return pref, err
	}

	// If the file exists, read it
	file, err := os.Open(filePath)
	if err != nil {
		return pref, err
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		return pref, err
	}

	err = json.Unmarshal(data, &pref)
	return pref, err
}

// getPreferencesFilePath returns the path to the preferences file
func (a *App) getPreferencesFilePath() (string, error) {
	// Get the user's home directory
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	// Define the preferences file path
	return filepath.Join(homeDir, "."+appName, "preferences.json"), nil
}
