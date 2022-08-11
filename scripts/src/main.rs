mod aws_s3;
mod directory_files;
mod upload_directory;

use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  let vargs: Vec<String> = env::args().collect();
  let module = vargs[1].as_str();
  let dir_path = vargs[2].as_str();
  
  match module {
    "upload-directory-to-s3" => upload_directory::to_s3(dir_path).await?,
    _ => panic!("Invalid module '{}'", module)
  };

  Ok(())
}




