use std::{env, vec};

use aws_sdk_s3::types::{ByteStream};

use crate::directory_files::DirectoryData;

const BUCKET_NAME: &str = "github-my-portfolio";

async fn setup() -> Result<aws_sdk_s3::Client, aws_sdk_s3::Error> {
	env::var("AWS_ACCESS_KEY_ID").expect("Should set AWS_ACCSS_KEY_ID");
	env::var("AWS_SECRET_ACCESS_KEY").expect("Should set AWS_SECRET_ACCESS_KEY");
	env::var("AWS_REGION").expect("Should set AWS_REGION");
	
	let sdk_config = aws_config::load_from_env().await;
	let s3 = aws_sdk_s3::Client::new(&sdk_config);

	return Ok(s3);
}

pub async fn upload_files(files: Vec<DirectoryData>, path: &str) -> Result<(), Box<dyn std::error::Error>> {
	let s3 = setup().await.expect("An error occurred while configuring s3");

	for file in files {
		/*
		* FIXME:
		* If the path path not end with "/", e.g. "./some/path", the files s3
		* will be stored in "/" resource and deploy does not work.
		* For it to work, the path has to be like "./some/path/"
		*/
		let key = file.relative_path.replace(path, "");
    let stream_content = ByteStream::from(file.content.unwrap_or(vec![]));
		
    s3.put_object()
      .bucket(BUCKET_NAME)
			.key(key)
      .content_type(&file.content_type)
      .body(stream_content)
      .send().await?;
	}
	return Ok(());
}