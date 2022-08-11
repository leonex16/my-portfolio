use crate::{aws_s3, directory_files};

pub async fn to_s3(path: &str) -> Result<(), Box<dyn std::error::Error>>{
	let files = directory_files::get(path).expect("An error occurred while getting the files");
	let files_len = files.len();

	eprintln!("To process {} files", files_len);
	aws_s3::upload_files(files, path).await?;
	eprintln!("{} successfully uploaded", files_len);

	Ok(())
}