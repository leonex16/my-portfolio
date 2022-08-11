use std::fs;
use mime_guess;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct DirectoryData {
  pub relative_path: String,
  pub content_type: String,
  pub content: Option<Vec<u8>>,
}

pub fn get(path: &str) -> Result<Vec<DirectoryData>, Box<dyn std::error::Error>> {
  let mut files_data = get_directory_files(String::from(path));
  read_files_and_set_content(&mut files_data);

	return Ok(files_data);
}

fn get_directory_files(path: String) -> Vec<DirectoryData> {
  let mut directories_data: Vec<DirectoryData> = vec![];
  let files = fs::read_dir(&path);

  let files = match files {
    Ok(file) => file,
    Err(err) => panic!("Error reading directory {} => [ERROR] {}", path, err)
  };

  for file in files {
    let file = file.unwrap();
    let relative_path = file.path().display().to_string();
    let is_file = file.metadata().unwrap().is_file();
    let content_type = mime_guess::from_path(&relative_path).first_or_text_plain().to_string();
    let directory_data = DirectoryData { content_type, relative_path: relative_path.clone(), content: None };

    if is_file { directories_data.push(directory_data) }
    else { directories_data.append( &mut get_directory_files(relative_path.clone()) ) }
  }

  return directories_data;
}

fn read_files_and_set_content(files: &mut Vec<DirectoryData>) {
  for file in files {
    let content = fs::read(&file.relative_path).unwrap();
    file.content = Some( content );
  }
}