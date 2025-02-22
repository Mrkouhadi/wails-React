package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

const appName = "wails-react-template"

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title:            appName,
		Width:            1024,
		Height:           768,
		MinWidth:         1024,
		MinHeight:        768,
		Assets:           assets,
		OnStartup:        app.startup,
		OnBeforeClose:    app.BeforeClose,
		WindowStartState: 0, // Normal = 0 ,Maximised = 1,Minimised = 2,Fullscreen = 3
		Frameless:        false,
		Bind: []interface{}{
			app,
		},

		Mac: &mac.Options{
			About: &mac.AboutInfo{
				Title:   appName,
				Message: "© 2024 www.my-app.com",
				Icon:    icon,
			},
			WindowIsTranslucent: false,
			DisableZoom:         false,
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              true,
			WindowIsTranslucent:               true,
			BackdropType:                      windows.Mica,
			DisablePinchZoom:                  true,
			DisableWindowIcon:                 false,
			DisableFramelessWindowDecorations: false,
			WebviewUserDataPath:               "",
			WebviewBrowserPath:                "",
			Theme:                             windows.SystemDefault,
			CustomTheme: &windows.ThemeSettings{
				DarkModeTitleBar:   windows.RGB(20, 20, 20),
				DarkModeTitleText:  windows.RGB(200, 200, 200),
				DarkModeBorder:     windows.RGB(20, 0, 20),
				LightModeTitleBar:  windows.RGB(200, 200, 200),
				LightModeTitleText: windows.RGB(20, 20, 20),
				LightModeBorder:    windows.RGB(200, 200, 200),
			},
			ZoomFactor:           4,
			IsZoomControlEnabled: false,
			WebviewGpuIsDisabled: false,
		},
		Linux: &linux.Options{
			Icon:                icon,
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         appName,
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: false,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
