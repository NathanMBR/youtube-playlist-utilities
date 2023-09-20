// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Window;
use tauri_plugin_oauth::{start_with_config, OauthConfig};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn start_server(window: Window) -> Result<u16, String> {
  let config = OauthConfig {
    ports: Some(vec![4172]),
    response: Some("<html><body><p>Authentication done. You can close this window.</p></body></html>".into()),
  };

  start_with_config(config, move |url| {
    let _ = window.emit("google-auth-callback", &url);
  })
  .map_err(|err| err.to_string())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![start_server])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
